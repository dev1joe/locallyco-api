import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import { products } from "./products.ts"
import { relations } from "drizzle-orm";

// TODO: add user and link it with review table

export const reviews = pgTable("review", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productId: integer("product_id").references(() => products.id).notNull(),
	// userId: integer("user_id").references(() =>),
	rate: integer(),
	comment: varchar({ length: 1000 }),
	...timestamps
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
	products: one(products, {
		fields: [reviews.productId],
		references: [products.id]
	}),
}));