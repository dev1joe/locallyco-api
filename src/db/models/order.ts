import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import customer from "./customer.ts";
import address from "./address.ts";
import payment from "./payment.ts";

const order = pgTable("order", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	customerId: integer("customer_id").references(() => customer.id),
	addressId: integer("address_id").references(() => address.id),
	paymentId: integer("payment_id").references(() => payment.id),
	...timestamps
});

export default order;