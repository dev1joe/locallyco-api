import express from "express";
import { config } from "../config/config.ts";
import productRouter from "./routes/v1/product.router.ts";
import Router from "express"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth.ts"
import cors from "cors";

// TODO: use cors, compression
const app = express();

app.use(
	cors({
		origin: config.frontEndURL,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

const v1 = Router();
v1.use("/products", productRouter);
// v1.use("/sku", skuRouter);

app.use("/api/v1", v1);

app.listen(config.appPort, () => {
	console.log(`Express server listening on port ${config.appPort}`);
});

// const db = await connectToDatabase(config.db);
// if (!db) {
//     console.error("Failed to connect to the database. Exiting...");
//     process.exit(1);
// }
