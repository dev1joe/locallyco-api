import db from "@src/db/db.ts";
import { discounts } from "@src/db/models/discounts";
import { productDiscounts } from "@src/db/models/productDiscounts";
import { brandDiscounts } from "@src/db/models/brandDiscounts";
import { categoryDiscounts } from "@src/db/models/categoryDiscounts";
import { eq } from "drizzle-orm";

// TODO: perform only one query instead of three
export async function getDiscounts(params?: Record<string, any>): Promise<Array<Object> | null> {
    let discounts: Array<Object> = [];
    
    if (params) {
        const productId = (params.product)? parseInt(params.product) : null;

        if (productId && !isNaN(productId)) {
            console.log("finding a discount for product...", params.product);
            const productDiscounts = await getProductDiscounts(productId);
            discounts.push(...productDiscounts);
        }

        if ("brand" in params && !isNaN(parseInt(params.brand))) {
            console.log("finding a discount for brand...", params.brand);
            const brandDiscounts = await getBrandDiscounts(params.brand);
            discounts.push(...brandDiscounts);
        }

        if ("category" in params && !isNaN(parseInt(params.category))) {
            console.log("finding a discount for category...", params.category);
            const categoryDiscounts = await getCategoryDiscounts(params.category);
            discounts.push(...categoryDiscounts);            
        }
    } else {
        discounts = await db?.query.discounts.findMany() || [];
    }
    return discounts;
}

// findFirst returns undefined if the wanted discount does not exist
export async function getDiscountById(id: number): Promise<Object | undefined> {
    return await db?.query.discounts.findFirst({
        where: eq(discounts.id, id)
    });
}

export async function getDiscountsForEntities(productId?: number, brandId?: number, categoryId?: number) {
    const discounts: Array<Object> = [];

    if (productId) {
        const productDiscounts = await getProductDiscounts(productId);
        discounts.push(...productDiscounts);
    }

    if (brandId) {
        const brandDiscounts = await getBrandDiscounts(brandId);
        discounts.push(...brandDiscounts);
    }

    if (categoryId) {
        const categoryDiscounts = await getCategoryDiscounts(categoryId);
        discounts.push(...categoryDiscounts);
    }

    return discounts;
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