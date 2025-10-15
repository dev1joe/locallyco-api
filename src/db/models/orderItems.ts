import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { orders } from "./orders.ts"
import { products } from "./products.ts";

export const orderItems = pgTable("order_items", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderId: integer().references(() => orders.id),
	productId: integer().references(() => products.id),
	quantity: integer(),
	itemPriceCent: integer(),
	...timestamps
});
