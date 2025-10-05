import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { order } from "./order.ts"
import { products } from "./products.ts";

export const orderItem = pgTable("order_item", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderId: integer().references(() => order.id),
	productId: integer().references(() => products.id),
	quantity: integer(),
	itemPriceCent: integer(),
	...timestamps
});
