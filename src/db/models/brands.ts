import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import timestamps from "../common/columns/timestamps.ts";

import { products } from "./products.ts";
import address from "./address.ts";
import { categories } from "./categories.ts";

export const brands = pgTable("brands", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer('category_id').references(() => categories.id),
	address: integer().references(() => address.id),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps
});

// Define the relations for the brands table
export const brandsRelations = relations(brands, ({ many }) => ({
	products: many(products),
}));
