import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import cart from "./cart.ts"
import product from "./product.ts"

const order_item = pgTable(
	"order_item",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		cart_id: integer().references(() => cart.id),
		product_id: integer().references(() => product.id),
		quantity: integer(),
		...timestamps
	},
);

export default order_item;
