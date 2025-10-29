import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar, text } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { addresses } from "./addresses.ts";
import { user } from "./authSchema.ts";

export const customers = pgTable("customers", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	addressId: integer("address_id").references(() => addresses.id).notNull(),
	userId: text().references(() => user.id).notNull(),
	fname: varchar({ length: 256 }),
	lname: varchar({ length: 256 }),
	...timestamps
});
