import db from "../../db/db.ts";
import { products } from "../../db/models/products.ts";
import { categories } from "../../db/models/categories.ts";
import { brands } from "../../db/models/brands.ts";
import { eq } from "drizzle-orm";
import type { createProductDTO } from "../../types/v1/product.ts";

// TODO: pull in reviews data (all and single) including total rating, number of reviews, first 5 reviews, rating distribution
// TODO: add product features varchar array column and pull it in (all and single)

// TODO: handle filtering (all products)
export async function getProducts(params = null): Promise<Array<Object> | null> {
	return await db?.query.products.findMany({ with: { category: true, brand: true } }) || [];
}

// TODO: get some similar suggested products
export async function getProductById(id: number): Promise<Object | null> {
	return await db?.query.products.findFirst({
		where: eq(products.id, id),
		with: { category: true, brand: true },
	}) || [];
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
