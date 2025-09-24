import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import { products } from "./products.ts"

// TODO: add user and link it with review table

const review = pgTable("review", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productId: integer("product_id").references(() => products.id),
	// userId: integer("user_id").references(() =>),
	rate: integer(),
	comment: varchar({ length: 1000 }),
	...timestamps
});

export default review;