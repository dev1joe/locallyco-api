import { mysqlTable as table } from "drizzle-orm/mysql-core";
import { int, varchar } from "drizzle-orm/mysql-core";
import timestamps from "../columns/timestamps.column.ts";

const categories = table(
    "categories", {
        id: int().primaryKey().autoincrement(),
        name: varchar({ length: 256 }),
        ...timestamps
    }
);

export default categories;