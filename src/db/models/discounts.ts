import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

/**
 * Discounts Table
 * can be started or ended at specific dates
 * can be activated or deactivated manually
 * can apply to specific products, categories, brands, carts
 */
export const discounts = pgTable("discounts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 256 }),
    type: varchar({ length: 100 }).notNull(), // e.g., percentage, amount
    value: integer().notNull(), // e.g., 10 for 10% or $10
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    isActive: boolean("is_active").default(true),
    appliesToType: varchar({ length: 100 }), // e.g., product, category, brand, cart/order/payment
    minPurchaseAmountCents: integer("min_purchase_amount_cents"),
    ...timestamps
});