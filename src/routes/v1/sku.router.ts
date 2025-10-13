import Router from "express";
import * as SC from "../../controllers/v1/sku.controller.ts";
import { checkSchema } from "express-validator";
import createSkuValidationSchema from "../../trash/createSkuValidationSchema.ts";

const skuRouter = Router();

skuRouter.get("/", SC.getSkus);

// TODO: handle get Sku by code and remove get by id
skuRouter.get("/:code", (req, res) => {
    return res.status(500);
});

skuRouter.post("/", checkSchema(createSkuValidationSchema), SC.createSku);
skuRouter.post("/:id", checkSchema(createSkuValidationSchema), SC.createSku);
skuRouter.delete("/:id", SC.deleteSku);

export default skuRouter;