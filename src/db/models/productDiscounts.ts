import { pgTable } from "drizzle-orm/pg-core";
import { integer, primaryKey } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";
import { discounts } from "./discounts.ts";
import { products } from "./products.ts";

/**
 * Discount Product Junction Table
 * many-to-many relationship between discounts and products
 * has a composite primary key of discountId and productId
 */
export const productDiscounts = pgTable("product_discounts", {
    discountId: integer("discount_id").notNull().references(() => discounts.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    ...timestamps
}, (table) => [
    primaryKey({ columns: [table.discountId, table.productId] })
]);