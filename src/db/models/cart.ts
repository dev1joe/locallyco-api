import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import customer from "./customer.ts";

const cart = pgTable("cart", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	customerId: integer("customer_id").references(() => customer.id),
	name: varchar({ length: 256 }),
	status: integer(),
	...timestamps
});

export default cart;