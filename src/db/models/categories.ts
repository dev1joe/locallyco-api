import { pgTable } from "drizzle-orm/pg-core";
import { foreignKey, integer, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { products } from "./products.ts";
import timestamps from "../common/columns/timestamps.ts";

//? NOTE: see which is better .references or function foreignKey
// TODO: make the table name plural
export const categories = pgTable(
	"category",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		// parent_id: integer().references((): AnyPgColumn => category.id),
		parentId: integer("parent_id"),
		name: varchar({ length: 256 }),
		description: varchar({ length: 1000 }),
		attributes: jsonb(),
		...timestamps
	},
	(table) => [
		foreignKey({
			// name: "custom_fk"
			columns: [table.parentId],
			foreignColumns: [table.id],
		})
	],
);

// Define the relations for the categories table
export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products),
}));