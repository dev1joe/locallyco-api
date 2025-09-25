import dotenv from "dotenv"
import { z } from "zod"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config({
	// debug: true,
	path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env")
})

const configSchema = z.object({
	db: z.object({
		host: z.string().default("localhost"),
		port: z.coerce.number().default(5432),
		user: z.string(),
		password: z.string(),
		database: z.string(),
		ssl: z.boolean().default(false),
	}),
	frontEndURL: z.string().optional(),
	appPort: z.coerce.number().default(8888),
	googleClientId: z.string(),
	googleClientSecret: z.string(),
});

// Parse environment variables
const result = configSchema.safeParse({
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		ssl: process.env.DB_SSL === "true" ? true : false,
	},
	frontEndURL: process.env.FRONTEND_URL,
	appPort: process.env.APP_PORT,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

if (!result.success) {
	console.error("❌ Invalid env:");
	console.error(JSON.stringify(result.error.flatten().fieldErrors, null, 2));
	process.exit(1);
}

export const config = result.data
export type Config = z.infer<typeof configSchema>;
