import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { orderItem } from "./order_item.ts"

export const returnItem = pgTable("return_item", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderItemId: integer().references(() => orderItem.id),
	quantity: integer(),
	...timestamps
});
