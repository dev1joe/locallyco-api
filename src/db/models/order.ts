import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import customer from "./customer.ts";
import address from "./address.ts";
import payment from "./payment.ts";

const order = pgTable(
	"order",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		customer_id: integer().references(() => customer.id),
		address_id: integer().references(() => address.id),
		payment_id: integer().references(() => payment.id),
		...timestamps
	},
);

export default order;
