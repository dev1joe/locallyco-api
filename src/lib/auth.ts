import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db/db.ts";
import { openAPI } from "better-auth/plugins";
import { config } from "../../config/config.ts";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	telemetry: { enabled: false },

	// plugins: [
	// 	openAPI(),
	// ],

	// trustedOrigins: [
	// 	config.frontEndURL,
	// ],

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
