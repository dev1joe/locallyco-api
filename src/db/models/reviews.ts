import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { products } from "./products.ts"
import { customers } from "./customers.ts";

// TODO: add user and link it with review table

export const reviews = pgTable("reviews", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productId: integer().references(() => products.id).notNull(),
	customerId: integer().references(() => customers.id).notNull(),
	rate: integer(),
	comment: varchar({ length: 1000 }),
	...timestamps
});
