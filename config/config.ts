import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config({
	// debug: true,
	path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env")
})

export const config = {
	db: {
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
		user: process.env.DB_USER as string,
		password: process.env.DB_PASSWORD as string,
		database: process.env.DB_NAME as string,
		ssl: false,
	},

	frontEndURL: process.env.FRONTEND_URL as string,

	appPort: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8888,
	googleClientId: process.env.GOOGLE_CLIENT_ID as string,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
}
