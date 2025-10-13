import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { carts } from "./carts.ts"
import { products } from "./products.ts"

export const cartItems = pgTable("cart_items", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	cartId: integer().references(() => carts.id),
	productId: integer().references(() => products.id),
	quantity: integer(),
	...timestamps
});
