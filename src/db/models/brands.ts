import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { address } from "./address.ts";
import { categories } from "./categories.ts";

export const brands = pgTable("brands", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer().references(() => categories.id),
	address: integer().references(() => address.id),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps
});
