import App from "express";
import "dotenv/config.js";
import productRouter from "./routes/v1/product.router.ts";
import Router from "express"
import config from "../config/config.ts";

// TODO: use cors, compression
const PORT = process.env.PORT || 8888;

const app = App();
app.use(App.json());

const v1 = Router();
v1.use("/products", productRouter);
// v1.use("/sku", skuRouter);

app.use("/api/v1", v1);

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

// const db = await connectToDatabase(config.db);
// if (!db) {
//     console.error("Failed to connect to the database. Exiting...");
//     process.exit(1);
// }