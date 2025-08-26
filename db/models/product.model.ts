import { mysqlTable as table } from "drizzle-orm/mysql-core";
import { int, varchar  } from "drizzle-orm/mysql-core";
import categories from "./category.model.ts";
import brands from "./brand.model.ts";
import timestamps from "../columns/timestamps.column.ts";


const products = table(
    "products", {
        id: int().primaryKey().autoincrement(),
        name: varchar({ length: 256 }),
        desc: varchar({ length: 1000 }),
        category_id: int().references(() => categories.id, { onDelete: "cascade" }), // TODO: what to do on update ??
        brand_id: int().references(() => brands.id, { onDelete: "cascade" }),
        ...timestamps
    }
);

export default products;

// export const users = table(
//     "users",
//     {
//         id: t.int().primaryKey().autoincrement(),
//         firstName: t.varchar("first_name", { length: 256 }),
//         lastName: t.varchar("last_name", { length: 256 }),
//         email: t.varchar({ length: 256 }).notNull(),
//         invitee: t.int().references((): AnyMySqlColumn => users.id),
//         role: t.mysqlEnum(["guest", "user", "admin"]).default("guest"),
//     },
//     (table) => [
//         t.uniqueIndex("email_idx").on(table.email)
//     ]
// );