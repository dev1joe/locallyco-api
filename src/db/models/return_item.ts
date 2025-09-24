import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import orderItem from "./order_item.ts"

const returnItem = pgTable("return_item", {
	orderItemId: integer("order_item_id").references(() => orderItem.id).primaryKey(),
	quantity: integer(),
	...timestamps
});

export default returnItem;