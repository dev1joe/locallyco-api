import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
dotenv.config({
	// debug: true,
	path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env")
})

const config = {
	db: {
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
		user: process.env.DB_USER as string,
		password: process.env.DB_PASSWORD as string,
		database: process.env.DB_NAME as string,
		ssl: false,
	}
}

export default config;
console.log(config.db)
