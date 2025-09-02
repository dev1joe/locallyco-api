import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import promo from "./promo.ts"

const payment = pgTable(
	"payment",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		promo_id: integer().references(() => promo.id),
		price_cent: integer(),
		type: varchar({ length: 256 }),
		status: integer(),
		...timestamps
	},
);

export default payment;
