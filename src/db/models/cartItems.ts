import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";
import { check } from "drizzle-orm/pg-core/checks";
import { sql } from "drizzle-orm";

import { carts } from "./carts.ts"
import { products } from "./products.ts"

export const cartItems = pgTable("cart_items", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	cartId: integer().references(() => carts.id).notNull(),
	productId: integer().references(() => products.id).notNull(),
	quantity: integer().notNull(),
	...timestamps
}, (table) => [
	check("quantity_check", sql`${table.quantity} > 0`)
]);
