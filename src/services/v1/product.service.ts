import { InsertProducts, Product } from "@src/db/types.ts";
import db from "../../db/db.ts";
import { products } from "@src/db/models/products.ts";
import { categories } from "@src/db/models/categories.ts";
import { brands } from "@src/db/models/brands.ts";
import { eq, sql, and, or, ne, gte } from "drizzle-orm";
import { getProductRatingStats } from "./reviews.service.ts";
import { productSkus } from "@src/db/models/productSkus.ts";

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
			with: { customer: { columns: { id: true, fname: true, lname: true } } }
		}
	}

	const product = await db?.query.products.findFirst({
		where: eq(products.id, id),
		with: withOptions,
	});

	if (product && 'reviews' in withOptions) {
		const ratingStats = await getProductRatingStats(id);
		return { ...product, ratingStats };
	} else {
		return product;
	}
}

export async function getRelevantProducts(id: number, minRelevanceScore: number = 2, limit: number = 5): Promise<Object[]> {
	const product: Product | undefined = await db?.query.products.findFirst({ where: eq(products.id, id) });

	if (!product) return [];

	const result = await db?.execute(sql`
		select
			p.id,
			p.name,
			p.image_url as "imageUrl",
			p.category_id as "categoryId",
			c.name as "categoryName",
			p.brand_id as "brandId",
			b.name as "brandName",
			COALESCE(s.price_cent, 0) as "priceCent",
			CASE 
				WHEN p.brand_id = ${product.brandId} AND p.category_id = ${product.categoryId} THEN 3	
				WHEN p.category_id = c.id THEN 1
				WHEN p.brand_id = b.id THEN 1
				ELSE 0
				END AS relevance
		from products as p
		left join lateral (
			select price_cent
			from product_skus
			where product_skus.product_id = p.id
			limit 1
		) as s on true
		left join brands as b on b.id = p.brand_id
		left join categories as c on c.id = p.category_id
		where p.id != 2 and ((p.brand_id = b.id) or (p.category_id = c.id))
		limit 10;
	`);

	const relatedProducts = result.rows.filter((p: Record<string, any>) => p.relevance >= minRelevanceScore);

	return relatedProducts;
}

// export async function getRelevantProducts(id: number, minRelevanceScore: number = 2, limit: number = 5): Promise<Object[]> {
// 	const product: Product | undefined = await db?.query.products.findFirst({ where: eq(products.id, id) });

// 	if (!product) return [];

// 	// Build related products query with multiple criteria
// 	const relevanceScoreQuery = sql<number>`
//         		CASE 
// 					WHEN ${products.brandId} = ${product.brandId} AND ${products.categoryId} = ${product.categoryId} THEN 3
// 					WHEN ${products.categoryId} = ${product.categoryId} THEN 2
// 					WHEN ${products.brandId} = ${product.brandId} THEN 1
// 					ELSE 0
// 				END
//         	`.as('relevance');

// 	const skuQuery = db
// 		.select()
// 		.from(productSkus)
// 		.where(eq(productSkus.productId, id))
// 		.orderBy(productSkus.id)
// 		.limit(1)
// 		.as('priceCent');

// 	const result = await db
// 		.select({
// 			id: products.id,
// 			name: products.name,
// 			imageUrl: products.imageUrl,
// 			categoryId: products.categoryId,
// 			brandId: products.brandId,
// 			categoryName: categories.name,
// 			brandName: brands.name,
// 			priceCent: productSkus.priceCent,
// 			// Calculate relevance score
// 			relevance: relevanceScoreQuery
// 		})
// 		.from(products)
// 		.leftJoin(categories, eq(products.categoryId, categories.id))
// 		.leftJoin(brands, eq(products.brandId, brands.id))
// 		.leftJoinLateral(skuQuery, sql`true`)
// 		.where(
// 			and(
// 				ne(products.id, id), // Exclude the current product
// 				or(
// 					eq(products.categoryId, product.categoryId),
// 					eq(products.brandId, product.brandId)
// 				)
// 			)
// 		)
// 		.orderBy(sql`relevance DESC`)
// 		.limit(limit);

// 	const relatedProducts = result.filter((p) => p.relevance >= minRelevanceScore);

// 	return relatedProducts;
// }

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