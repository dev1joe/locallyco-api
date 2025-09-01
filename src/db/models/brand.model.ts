import { mysqlTable as table } from "drizzle-orm/mysql-core";
import { int, varchar } from "drizzle-orm/mysql-core";
import timestamps from "../columns/timestamps.column.ts";

const brands = table(
    "brands", {
        id: int().primaryKey().autoincrement(),
        name: varchar({ length: 256 }),
        desc: varchar({ length: 1000 }),
        ...timestamps
    }
);

export default brands;