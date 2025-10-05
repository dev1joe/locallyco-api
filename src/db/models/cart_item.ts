import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { cart } from "./cart.ts"
import { products } from "./products.ts"

export const cartItem = pgTable("cart_item", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	cartId: integer().references(() => cart.id),
	productId: integer().references(() => products.id),
	quantity: integer(),
	...timestamps
});
