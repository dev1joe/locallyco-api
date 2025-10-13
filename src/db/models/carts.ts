import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps";

import { customers } from "./customers"

export const carts = pgTable("carts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	customerId: integer().references(() => customers.id, { onDelete: "cascade" }),
	name: varchar({ length: 256 }),
	status: integer(),
	...timestamps
});
