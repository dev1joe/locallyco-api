import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

const address = pgTable(
	"address",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		country: varchar({ length: 256 }),
		governorate: varchar({ length: 256 }),
		district: varchar({ length: 256 }),
		street: varchar({ length: 256 }),
		building: varchar({ length: 256 }),
		floor: integer(),
		apartment: integer(),
		...timestamps
	},
);

export default address;
