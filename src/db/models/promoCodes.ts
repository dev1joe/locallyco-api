import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";
import { discounts } from "./discounts.ts";

/**
 * Promo Codes Table
 * connected to discounts table, hence can have start and end dates, activation status, etc.
 * basically a promo code is a discount with a usage limit
 */
export const promoCodes = pgTable("promo_codes", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	discountId: integer("discount_id").references(() => discounts.id, { onDelete: "cascade" }).notNull(),
	code: varchar({ length: 256 }),
	maxUseGlobal: integer("max_use_global"),
	useCountGlobal: integer("use_count_global").default(0),
	maxUsePerCustomer: integer("max_use_per_customer"),
	isStackable: boolean("is_stackable").default(false),
	...timestamps
});
