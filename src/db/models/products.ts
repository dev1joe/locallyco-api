import { pgTable, integer, varchar, jsonb } from "drizzle-orm/pg-core";

import { categories } from "./categories.ts";
import { brands } from "./brands.ts";
import { timestamps } from "../common/columns/timestamps.ts";

export const products = pgTable("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer().references(() => categories.id, { onDelete: "cascade" }), // TODO: what to do on update ??
	brandId: integer().references(() => brands.id, { onDelete: "cascade" }),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps,

	// New Columns
	versioning: jsonb(),
	imageUrl: varchar({ length: 256 }),
});
