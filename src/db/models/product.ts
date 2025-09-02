import { pgTable as table } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";

import category from "./category.ts";
import brands from "./brand.ts";
import timestamps from "../common/columns/timestamps.ts";

const products = table(
	"products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	category_id: integer().references(() => category.id, { onDelete: "cascade" }), // TODO: what to do on update ??
	brand_id: integer().references(() => brands.id, { onDelete: "cascade" }),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps
}
);

export default products;

// export const users = table(
//     "users",
//     {
//         id: t.integer().primaryKey().autoincrement(),
//         firstName: t.varchar("first_name", { length: 256 }),
//         lastName: t.varchar("last_name", { length: 256 }),
//         email: t.varchar({ length: 256 }).notNull(),
//         invitee: t.integer().references((): AnyMySqlColumn => users.id),
//         role: t.mysqlEnum(["guest", "user", "admin"]).default("guest"),
//     },
//     (table) => [
//         t.uniqueIndex("email_idx").on(table.email)
//     ]
// );
