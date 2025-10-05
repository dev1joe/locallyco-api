import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { customer } from "./customer.ts";
import { address } from "./address.ts";
import { payment } from "./payment.ts";

export const order = pgTable("order", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	customerId: integer().references(() => customer.id),
	addressId: integer().references(() => address.id),
	paymentId: integer().references(() => payment.id),
	...timestamps
});
