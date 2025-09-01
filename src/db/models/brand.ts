import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

const brands = pgTable(
	"brands",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		name: varchar({ length: 256 }),
		desc: varchar({ length: 1000 }),
		...timestamps
	},
);

export default brands;
