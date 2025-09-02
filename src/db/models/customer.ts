import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import address from "./address.ts";

const customer = pgTable(
	"customer",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		address_id: integer().references(() => address.id),
		fname: varchar({ length: 256 }),
		lname: varchar({ length: 256 }),
		...timestamps
	},
);

export default customer;
