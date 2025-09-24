import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import address from "./address.ts";
import category from "./category.ts";

const brands = pgTable("brands", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer('category_id').references(() => category.id),
	address: integer().references(() => address.id),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps
});

export default brands;