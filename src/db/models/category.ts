import { AnyPgColumn, foreignKey, pgTable } from "drizzle-orm/pg-core";
import { integer, varchar, jsonb } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

//NOTE: see which is better .references or function foreignKey

const category = pgTable(
	"category",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		// parent_id: integer().references((): AnyPgColumn => category.id),
		parent_id: integer(),
		name: varchar({ length: 256 }),
		description: varchar({ length: 1000 }),
		attributes: jsonb(),
		...timestamps
	},
	(table) => [
		foreignKey({
			// name: "custom_fk"
			columns: [table.parent_id],
			foreignColumns: [table.id],
		})
	],
);

export default category;
