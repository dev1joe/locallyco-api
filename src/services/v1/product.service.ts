import db from "../../db/db.ts";
import products from "../../db/models/product.ts";
import { eq } from "drizzle-orm";

// TODO: return Product object
export async function getProducts(): Promise<Array<Object> | null> {
	return await db?.select().from(products) || [];
}

// TODO: return Product object
export async function getProductById(id: number): Promise<Object | null> {
	return await db?.select().from(products).where(eq(products.id, id)).limit(1) || null;
}


export async function createProduct(data: Object) {
	return await db?.insert(products).values(data);
}

export async function updateProduct(id: number, data: Object) {
	return await db?.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
	return await db?.delete(products).where(eq(products.id, id));
}
