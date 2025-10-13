import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { addresses } from "./addresses.ts";
import { categories } from "./categories.ts";

export const brands = pgTable("brands", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer().references(() => categories.id),
	address: integer().references(() => addresses.id),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps
});
