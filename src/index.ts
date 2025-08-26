import App from "express";
import "dotenv/config.js";
import productRouter from "./routes/product.router.ts";
import connectToDatabase from "../db/db.ts";
import config from "../config/config.ts";

// TODO: use cors, compression

const app = App();

const PORT = process.env.PORT || 8888;

const db = await connectToDatabase(config.db);
if (!db) {
    console.error("Failed to connect to the database. Exiting...");
    process.exit(1);
}

app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

app.use("/products", productRouter);

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});