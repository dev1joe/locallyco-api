import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { orders } from "./orders.ts"

export const shipments = pgTable("shipments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderId: integer().references(() => orders.id),
	stage: integer(),
	estimatedTime: integer(),
	status: integer(),
	...timestamps
});
