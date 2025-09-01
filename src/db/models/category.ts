import { pgTable as table } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

const categories = table(
	"categories", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 256 }),
	...timestamps
}
);

export default categories;
