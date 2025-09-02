import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

const promo = pgTable(
	"promo",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		key: varchar({ length: 256 }),
		percentage: integer(),
		...timestamps
	},
);

export default promo;
