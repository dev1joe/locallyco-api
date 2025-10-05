import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar, text } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { address } from "./address.ts";
import { user } from "./auth-schema.ts";

export const customer = pgTable("customer", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	addressId: integer("address_id").references(() => address.id),
	userId: text().references(() => user.id),
	fname: varchar({ length: 256 }),
	lname: varchar({ length: 256 }),
	...timestamps
});
