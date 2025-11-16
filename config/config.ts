import dotenv from "dotenv"
import { z } from "zod"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config({
	debug: true,
	path: path.join(process.cwd(), ".env"),
})

const configSchema = z.object({
	db: z.object({ url: z.string() }),
	frontEndURL: z.string().optional(),
	appPort: z.coerce.number().default(8888),
	googleClientId: z.string(),
	googleClientSecret: z.string(),
});

// Parse environment variables
const result = configSchema.safeParse({
	db: { url: process.env.DATABASE_URL },
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
