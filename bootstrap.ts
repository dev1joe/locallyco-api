import express, { Router } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/lib/auth";
import { config } from "./config/config.ts";
import productRouter from "./src/routes/v1/product.router.ts";
import { brandRouter } from "./src/controllers/v1/brand";
import { cartRouter } from "./src/controllers/v1/cart";
import discountRouter from "./src/routes/v1/discount.router";
import categoryRouter from "./src/routes/v1/category.router";

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
v1.use("/brands", brandRouter);
v1.use("/customers/:customerId/carts", cartRouter);
v1.use("/discounts", discountRouter);
v1.use("/categories", categoryRouter);

app.use("/api/v1", v1);

export default app;