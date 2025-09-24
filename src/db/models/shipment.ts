import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import order from "./order.ts"

const shipment = pgTable("shipment", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	orderId: integer("order_id").references(() => order.id),
	stage: integer(),
	estimatedTime: integer("estimated_time"),
	status: integer(),
	...timestamps
});

export default shipment;