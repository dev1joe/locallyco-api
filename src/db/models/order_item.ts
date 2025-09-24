import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import order from "./order.ts"
import { products } from "./products.ts";

const orderItem = pgTable("order_item", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderId: integer("order_id").references(() => order.id),
	productId: integer("product_id").references(() => products.id),
	quantity: integer(),
	itemPriceCent: integer("item_price_cent"),
	...timestamps
});

export default orderItem;