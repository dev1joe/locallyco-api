import Router from "express";
import * as PC from "../controllers/product.controller.ts";

const productRouter = Router();

productRouter.get("/", PC.getProducts);

export default productRouter;