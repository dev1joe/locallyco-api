import db from "../../db/db.ts";
import { productSkus } from "@src/db/models/productSkus.ts";
import { NewProductSku } from "@src/db/types.ts";
import { eq } from "drizzle-orm";

export async function getSku(): Promise<Array<Object>> {
    return await db?.select().from(productSkus) || [];
}

export async function getSkuById(id: number): Promise<Object | null> {
    const result = await db?.select().from(productSkus).where(eq(productSkus.id, id));
    return result[0] || null;
}

export async function getSkuByCode(code: string): Promise<Object | null> {
    const result = await db?.select().from(productSkus).where(eq(productSkus.skuCode, code));
    return result[0] || null;
}

export async function getSkuByProductId(id: number): Promise<Array<Object>> {
    return await db?.select().from(productSkus).where(eq(productSkus.productId, id));
}

export async function createSku(data: NewProductSku) {
    return await db?.insert(productSkus).values(data);
}

export async function updateSku(id: number, data: Object) {
    return await db?.update(productSkus).set(data).where(eq(productSkus.id, id));
}

export async function deleteSku(id: number) {
    return await db?.delete(productSkus).where(eq(productSkus.id, id));
}
