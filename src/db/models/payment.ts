import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import promo from "./promo.ts"

const payment = pgTable("payment", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	promoId: integer("promo_id").references(() => promo.id),
	priceCent: integer("price_cent"),
	type: varchar({ length: 256 }),
	status: integer(),
	...timestamps
});

export default payment;