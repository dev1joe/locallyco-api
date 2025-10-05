import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { promo } from "./promo.ts"

export const payment = pgTable("payment", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	promoId: integer().references(() => promo.id),
	priceCent: integer(),
	type: varchar({ length: 256 }),
	status: integer(),
	...timestamps
});
