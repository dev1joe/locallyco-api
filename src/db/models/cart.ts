import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps";

import { customer } from "./customer"

export const cart = pgTable("cart", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	customerId: integer().references(() => customer.id, { onDelete: "cascade" }),
	name: varchar({ length: 256 }),
	status: integer(),
	...timestamps
});
