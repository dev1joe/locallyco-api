import db from "@src/db/db.ts";
import { discounts } from "@src/db/models/discounts";
import { productDiscounts } from "@src/db/models/productDiscounts";
import { brandDiscounts } from "@src/db/models/brandDiscounts";
import { categoryDiscounts } from "@src/db/models/categoryDiscounts";
import { eq, between, and } from "drizzle-orm";
import { Discount } from "@src/db/types";

// TODO: perform only one query instead of three
export async function getDiscounts(params?: Record<string, any>): Promise<Array<Object> | null> {
    let discounts: Array<Discount> = [];
    
    if (params) {
        const productId = (params.product)? parseInt(params.product) : null;
        const categoryId = (params.category)? parseInt(params.category) : null;
        const brandId = (params.brand)? parseInt(params.brand) : null;

        if (productId && !isNaN(productId)) {
            console.log("finding a discount for product...", productId);
            const productDiscounts = await getProductDiscounts(productId);
            discounts.push(...productDiscounts);
        }

        if (brandId && !isNaN(brandId)) {
            console.log("finding a discount for brand...", brandId);
            const brandDiscounts = await getBrandDiscounts(params.brand);
            discounts.push(...brandDiscounts);
        }

        if (categoryId && !isNaN(categoryId)) {
            console.log("finding a discount for category...", categoryId);
            const categoryDiscounts = await getCategoryDiscounts(params.category);
            discounts.push(...categoryDiscounts);            
        }
    } else {
        discounts = await db?.query.discounts.findMany() || [];
    }

    // only include active discounts
    const currentDate = new Date();
    const filteredDiscounts = discounts?.filter((dis) => {
        if (dis.startDate && dis.endDate) {
            if ((dis.startDate <= currentDate) && (dis.endDate >= currentDate)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    });

    return filteredDiscounts;
}

// findFirst returns undefined if the wanted discount does not exist
export async function getDiscountById(id: number): Promise<Object | undefined> {
    return await db?.query.discounts.findFirst({
        where: eq(discounts.id, id)
    });
}

export async function getProductDiscounts(productId: number) {
    const result = await db?.query.productDiscounts.findMany({
        where: eq(productDiscounts.productId, productId),
        columns: { discountId: false, productId: false },
        with: { discount: true }
    });

    const discountsArr = result.map(pd => pd.discount);
    return discountsArr;
}

export async function getBrandDiscounts(brandId: number) {
    const result = await db?.query.brandDiscounts.findMany({
        where: eq(brandDiscounts.brandId, brandId),
        columns: { discountId: false, brandId: false },
        with: { discount: true }
    });

    const discountsArr = result.map(pd => pd.discount);
    return discountsArr;
}

export async function getCategoryDiscounts(categoryId: number) {
    const result = await db?.query.categoryDiscounts.findMany({
        where: eq(categoryDiscounts.categoryId, categoryId),
        columns: { discountId: false, categoryId: false },
        with: { discount: true }
    });

    const discountsArr = result.map(pd => pd.discount);
    return discountsArr;
}