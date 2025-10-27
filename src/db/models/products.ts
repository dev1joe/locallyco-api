import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar, numeric, jsonb } from "drizzle-orm/pg-core";

import { categories } from "./categories.ts";
import { brands } from "./brands.ts";
import { timestamps } from "../common/columns/timestamps.ts";

export const products = pgTable("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer().references(() => categories.id, { onDelete: "cascade" }).notNull(), // TODO: what to do on update ??
	brandId: integer().references(() => brands.id, { onDelete: "cascade" }),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps,

	// New Columns
	attributes: jsonb().array(),
	imageUrl: varchar("image_url", { length: 512 }),

	// Review Columns
	reviewCount: integer("review_count"),
	averageRating: numeric("average_rating", { precision: 3, scale: 2 })
});

