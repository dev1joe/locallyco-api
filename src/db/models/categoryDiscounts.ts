import { pgTable } from "drizzle-orm/pg-core";
import { integer, primaryKey } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";
import { discounts } from "./discounts.ts";
import { categories } from "./categories.ts";

/**
 * Discount Category Junction Table
 * many-to-many relationship between discounts and categories
 * has a composite primary key of discountId and categoryId
 */
export const categoryDiscounts = pgTable("category_discounts", {
    discountId: integer("discount_id").notNull().references(() => discounts.id, { onDelete: "cascade" }),
    categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
    ...timestamps
}, (table) => [
    primaryKey({ columns: [table.discountId, table.categoryId] })
]);