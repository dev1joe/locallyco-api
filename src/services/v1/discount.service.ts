import db from "@src/db/db.ts";
import { discounts } from "@src/db/models/discounts";
import { productDiscounts } from "@src/db/models/productDiscounts";
import { brandDiscounts } from "@src/db/models/brandDiscounts";
import { categoryDiscounts } from "@src/db/models/categoryDiscounts";
import { eq } from "drizzle-orm";

export async function getDiscounts() {
    return await db?.query.discounts.findMany() || [];
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
        const productDiscounts = await getDiscountsForProduct(productId);
        discounts.push(...productDiscounts);
    }

    if (brandId) {
        const brandDiscounts = await getDiscountsForBrand(brandId);
        discounts.push(...brandDiscounts);
    }

    if (categoryId) {
        const categoryDiscounts = await getDiscountsForCategory(categoryId);
        discounts.push(...categoryDiscounts);
    }

    return discounts;
}

export async function getDiscountsForProduct(productId: number) {
    const result = await db?.query.productDiscounts.findMany({
        where: eq(productDiscounts.productId, productId),
        columns: { discountId: false, productId: false },
        with: { discount: true }
    });

    const discountsArr = result.map(pd => pd.discount);
    return discountsArr;
}

export async function getDiscountsForBrand(brandId: number) {
    const result = await db?.query.brandDiscounts.findMany({
        where: eq(brandDiscounts.brandId, brandId),
        columns: { discountId: false, brandId: false },
        with: { discount: true }
    });

    const discountsArr = result.map(pd => pd.discount);
    return discountsArr;
}

export async function getDiscountsForCategory(categoryId: number) {
    const result = await db?.query.categoryDiscounts.findMany({
        where: eq(categoryDiscounts.categoryId, categoryId),
        columns: { discountId: false, categoryId: false },
        with: { discount: true }
    });

    const discountsArr = result.map(pd => pd.discount);
    return discountsArr;
}