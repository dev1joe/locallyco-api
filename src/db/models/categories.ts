import { pgTable, foreignKey, integer, varchar, jsonb } from "drizzle-orm/pg-core";

import { timestamps } from "../common/columns/timestamps.ts";
import { categoryImages } from "./categoryImages.ts";

//? NOTE: see which is better .references or function foreignKey
// TODO: make the table name plural
export const categories = pgTable(
	"categories",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		parentId: integer("parent_id"),
		imageId: integer('image_id').references(() => categoryImages.id),
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
