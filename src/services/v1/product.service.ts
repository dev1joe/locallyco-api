import db from "../../db/db.ts";
import products from "../../db/models/product.ts";
import { eq } from "drizzle-orm";
import type { createProductDTO } from "../../types/v1/product.ts";

export async function getProducts(): Promise<Array<Object> | null> {
	return await db?.select().from(products) || [];
}

export async function getProductById(id: number): Promise<Object | null> {
	const result = await db?.select().from(products).where(eq(products.id, id)).limit(1) || null;
	return result[0] || null;
}

export async function createProduct(data: createProductDTO) {
	console.log(data);
	// TODO: should the client send data in camel case or snake case
	// either way, we are controlling the client, haha :)
	const { name, description, category_id, brand_id, versioning } = data;
	return await db?.insert(products).values({ name, description, categoryId: category_id, brandId: brand_id, versioning });
}

export async function updateProduct(id: number, data: createProductDTO) {
	return await db?.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
	return await db?.delete(products).where(eq(products.id, id));
}
