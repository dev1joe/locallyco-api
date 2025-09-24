import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import cart from "./cart.ts"
import product from "./product.ts"

const cartItem = pgTable("order_item", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	cartId: integer("cart_id").references(() => cart.id),
	productId: integer("product_id").references(() => product.id),
	quantity: integer(),
	...timestamps
});

export default cartItem;