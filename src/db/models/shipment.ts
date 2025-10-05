import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { order } from "./order.ts"

export const shipment = pgTable("shipment", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderId: integer().references(() => order.id),
	stage: integer(),
	estimatedTime: integer(),
	status: integer(),
	...timestamps
});
