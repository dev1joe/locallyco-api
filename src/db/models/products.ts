import { pgTable, integer, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { categories } from "./categories.ts";
import { brands } from "./brands.ts";
import timestamps from "../common/columns/timestamps.ts";

export const products = pgTable("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer("category_id").references(() => categories.id, { onDelete: "cascade" }), // TODO: what to do on update ??
	brandId: integer("brand_id").references(() => brands.id, { onDelete: "cascade" }),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps,

	// New Columns
	versioning: jsonb(),
	imageUrl: varchar("image_url", { length: 256 }),
});

// Define the relations for the products table
export const productsRelations = relations(products, ({ one }) => ({
	brand: one(brands, {
		fields: [products.brandId],
		references: [brands.id],
	}),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id],
	}),
}));
