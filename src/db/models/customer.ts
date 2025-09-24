import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import address from "./address.ts";

const customer = pgTable("customer", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	addressId: integer("address_id").references(() => address.id),
	fname: varchar({ length: 256 }),
	lname: varchar({ length: 256 }),
	...timestamps
});

export default customer;
