import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import xss from "xss";

import address from "src/db/models/address.ts"


export const addressSelectSchema = createSelectSchema(address, {
	country: (schema) => schema.transform((item) => xss(item)),
	governorate: (schema) => schema.transform((item) => xss(item)),
	district: (schema) => schema.transform((item) => xss(item)),
	street: (schema) => schema.transform((item) => xss(item)),
	building: (schema) => schema.transform((item) => xss(item)),
});
export type addressSelectSchema = z.infer<typeof addressSelectSchema>;

export const addressInsertSchema = createInsertSchema(address, {
	country: (schema) => schema.transform((item) => xss(item)),
	governorate: (schema) => schema.transform((item) => xss(item)),
	district: (schema) => schema.transform((item) => xss(item)),
	street: (schema) => schema.transform((item) => xss(item)),
	building: (schema) => schema.transform((item) => xss(item)),
});
export type addressInsertSchema = z.infer<typeof addressInsertSchema>;

export const addressUpdateSchema = createUpdateSchema(address, {
	country: (schema) => schema.transform((item) => xss(item)),
	governorate: (schema) => schema.transform((item) => xss(item)),
	district: (schema) => schema.transform((item) => xss(item)),
	street: (schema) => schema.transform((item) => xss(item)),
	building: (schema) => schema.transform((item) => xss(item)),
});
export type addressUpdateSchema = z.infer<typeof addressUpdateSchema>;
