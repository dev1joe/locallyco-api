import { pgTable, PgTable } from "drizzle-orm/pg-core";
import { varchar, integer } from "drizzle-orm/pg-core";

export const categoryImages = pgTable('category_images', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: varchar().notNull(),
    height: integer().default(400),
    labelPosition: varchar('label_position').default('center')
});