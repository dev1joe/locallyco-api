import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import order from "./order.ts"

const shipment = pgTable(
	"shipment",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		order_id: integer().references(() => order.id),
		stage: integer(),
		estimated_time: integer(),
		status: integer(),
		...timestamps
	},
);

export default shipment;
