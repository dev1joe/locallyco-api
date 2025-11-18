import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db/db.ts";
import { openAPI, admin as adminPlugIn } from "better-auth/plugins";
import { config } from "../../config/config.ts";
import { ac, admin, brand, customer } from "./permissions.ts"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	telemetry: { enabled: false },

	plugins: [
		// openAPI(),
		adminPlugIn({
			ac,
			roles: {
				admin,
				brand,
				customer,
			},
		}),
	],

	trustedOrigins: [
		config.frontEndURL as string,
	],

	emailAndPassword: {
		enabled: true,
	},

	socialProviders: {
		google: {
			// prompt: 
			clientId: config.googleClientId as string,
			clientSecret: config.googleClientSecret as string,
		},
	},
});
