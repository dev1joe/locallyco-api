import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { promoCodes } from "./promoCodes.ts"

/**
 * replace promoId with a junction table "Applied Discounts"(paymentId, discountId) for allowing multiple discounts
 */
export const payments = pgTable("payments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	promoId: integer().references(() => promoCodes.id),
	priceCent: integer(),
	type: varchar({ length: 256 }),
	status: integer(), // TODO: integer mapping ??
	...timestamps
});
