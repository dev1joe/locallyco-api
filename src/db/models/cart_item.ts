import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";
import { check } from "drizzle-orm/pg-core/checks";
import { sql } from "drizzle-orm";

import { cart } from "./cart.ts"
import { products } from "./products.ts"
export const cartItem = pgTable("cart_item", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	cartId: integer().references(() => cart.id).notNull(),
	productId: integer().references(() => products.id).notNull(),
	quantity: integer().notNull(),
	...timestamps
}, (table) => [
	check("quantity_check", sql`${table.quantity} > 0`)
]);
