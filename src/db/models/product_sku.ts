import { pgTable, jsonb, integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { products } from "./products.ts"

export const productSku = pgTable("product_sku", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productId: integer().references(() => products.id).notNull(),
	skuCode: varchar({ length: 256 }),
	attributes: jsonb(),
	quantity: integer(),
	priceCent: integer(),
	...timestamps,

	// New Columns
	images: varchar().array()
});
