import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { orderItems } from "./orderItems.ts"

export const returnItems = pgTable("return_items", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderItemId: integer().references(() => orderItems.id),
	quantity: integer(),
	...timestamps
});
