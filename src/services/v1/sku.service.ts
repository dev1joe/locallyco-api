import db from "../../db/db.ts";
import sku from "../../db/models/product_sku.ts";
import { eq } from "drizzle-orm";

export async function getSku(): Promise<Array<Object>> {
    return await db?.select().from(sku) || [];
}

export async function getSkuById(id: number): Promise<Object | null> {
    const result = await db?.select().from(sku).where(eq(sku.id, id));
    return result[0] || null;
}

export async function getSkuByCode(code: string): Promise<Object | null> {
    const result = await db?.select().from(sku).where(eq(sku.skuCode, code));
    return result[0] || null;
}

export async function getSkuByProductId(id: number): Promise<Array<Object>> {
    return await db?.select().from(sku).where(eq(sku.productId, id));
}

export async function createSku(data: Object) {
    return await db?.insert(sku).values(data);
}

export async function updateSku(id: number, data: Object) {
    return await db?.update(sku).set(data).where(eq(sku.id, id));
}

export async function deleteSku(id: number) {
    return await db?.delete(sku).where(eq(sku.id, id));
}