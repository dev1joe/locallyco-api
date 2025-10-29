import Router from "express";
import * as PC from "../../controllers/v1/product.controller.ts";
import { checkSchema } from "express-validator";
import createProductValidationSchema from "../../trash/createProductValidationSchema.ts";

// TODO: remove express-validator

//    /api/v1/products
const productRouter = Router();

// Read
productRouter.get("/", PC.getProducts);
productRouter.get("/:id", PC.getProductById);
productRouter.get("/:id/versions", PC.getProductVersions);
productRouter.get("/:id/discounts", PC.getProductDiscounts);
productRouter.get("/:id/relevant", PC.getRelevantProducts);

// create 
productRouter.post("/", checkSchema(createProductValidationSchema), PC.createProduct);

// Update
productRouter.put("/:id", checkSchema(createProductValidationSchema), PC.updateProduct);

// Delete
productRouter.delete("/:id", PC.deleteProduct);

export default productRouter;