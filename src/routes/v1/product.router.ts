import Router from "express";
import * as PC from "../../controllers/v1/product.controller.ts";
import { checkSchema } from "express-validator";
import createProductValidationSchema from "../../validators/v1/createProductValidationSchema.ts";

const productRouter = Router();

// Read
productRouter.get("/", PC.getProducts);
productRouter.get("/:id", PC.getProductById);

// create 
productRouter.post("/", checkSchema(createProductValidationSchema), PC.createProduct);

// Update
productRouter.put("/:id", checkSchema(createProductValidationSchema), PC.updateProduct);

// Delete
productRouter.delete("/:id", PC.deleteProduct);

export default productRouter;