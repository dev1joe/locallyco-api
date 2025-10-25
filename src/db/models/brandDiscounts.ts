import { pgTable } from "drizzle-orm/pg-core";
import { integer, primaryKey } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";
import { discounts } from "./discounts.ts";
import { brands } from "./brands.ts";

/**
 * Discount Brand Junction Table
 * many-to-many relationship between discounts and brands
 * has a composite primary key of discountId and brandId
 */
export const brandDiscounts = pgTable("brand_discounts", {
    discountId: integer("discount_id").notNull().references(() => discounts.id, { onDelete: "cascade" }),
    brandId: integer("brand_id").notNull().references(() => brands.id, { onDelete: "cascade" }),
    ...timestamps
}, (table) => [
    primaryKey({ columns: [table.discountId, table.brandId] })
]);