import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import order from "./order.ts"
import products from "./product.ts";

const order_item = pgTable(
	"order_item",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		order_id: integer().references(() => order.id),
		product_id: integer().references(() => products.id),
		quantity: integer(),
		item_price_cent: integer(),
		...timestamps
	},
);

export default order_item;
