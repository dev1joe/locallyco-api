import { pgTable } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { customers } from "./customers.ts";
import { addresses } from "./addresses.ts";
import { payments } from "./payments.ts";

export const orders = pgTable("orders", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	customerId: integer().references(() => customers.id),
	addressId: integer().references(() => addresses.id),
	paymentId: integer().references(() => payments.id),
	...timestamps
});
