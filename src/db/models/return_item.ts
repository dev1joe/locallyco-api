import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import order_item from "./order_item.ts"

const return_item = pgTable(
	"return_item",
	{
		order_item_id: integer().references(() => order_item.id).primaryKey(),
		quantity: integer(),
		...timestamps
	},
);

export default return_item;
