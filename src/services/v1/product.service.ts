import { InsertProducts, Product } from "@src/db/types.ts";
import db from "../../db/db.ts";
import { products } from "../../db/models/products.ts";
import { eq } from "drizzle-orm";
import { getProductRatingStats } from "./reviews.service.ts";

// TODO: pull in reviews data (all and single) including total rating, number of reviews, first 5 reviews, rating distribution
// TODO: add product features varchar array column and pull it in (all and single)

// TODO: handle filtering (all products)

/**
 * checks if any request parameter is mentioned and provides it
 * sets a hard limit to the reviews count to 10
 */
export async function getProducts(params?: Record<string, any>): Promise<Array<Object> | null> {
	let withOptions: Record<string, any> = {}

	if (params) {
		withOptions = applyQueryParams(params);
	}

	console.log("with options: ", withOptions);

	return await db?.query.products.findMany({ with: withOptions }) || [];
}

// TODO: get some similar suggested products
// findFirst function returns undefine if the wanted product does not exist
export async function getProductById(id: number, params?: Record<string, any>): Promise<Object | undefined> {
	let withOptions: Record<string, any> = {}

	if (params) {
		withOptions = applyQueryParams(params);
	}

	if (withOptions.reviews) {
		withOptions.reviews = {
			...withOptions.reviews,
			with: { customer: { columns: { id: true, fname: true, lname: true }}}
		}
	}

	const product = await db?.query.products.findFirst({
		where: eq(products.id, id),
		with: withOptions,
	});

	if ( product && 'reviews' in withOptions ) {
		const ratingStats = await getProductRatingStats(id);
		return { ...product, ratingStats };
	} else {
		return product;
	}
}

export async function createProduct(data: InsertProducts) {
	console.log(data);
	const { name, description, categoryId, brandId, attributes } = data;
	return await db?.insert(products).values({ name, description, categoryId, brandId, attributes });
}

export async function updateProduct(id: number, data: InsertProducts) {
	return await db?.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
	return await db?.delete(products).where(eq(products.id, id));
}

function applyQueryParams(params: Record<string, any>): Record<string, any> {
	const withOptions: Record<string, any> = {}

	// [____ Category ____]
	if ("category" in params) withOptions.category = true;

	// [____ Brands ____]
	if ("brand" in params) withOptions.brand = true;

	// [____ Reviews ____]
	let reviewParamValue: any;

	// check for singular
	if ("review" in params) reviewParamValue = params.review;

	// check for plural
	if ("reviews" in params) reviewParamValue = params.reviews;

	if (reviewParamValue !== undefined) {
		const requestedCount = parseInt(reviewParamValue);

		if (!isNaN(requestedCount) && requestedCount >= 1) {
			console.log("review is a number");
			withOptions.reviews = { limit: Math.min(requestedCount, 10) }
		} else {
			console.log("review is not a number");
			withOptions.reviews = { limit: 5 }
		}
	}

	return withOptions;
}