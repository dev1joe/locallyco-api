import { Router } from "express";
import * as CC from "@src/controllers/v1/category.controller.ts";

const categoryRouter = Router();

categoryRouter.get("/", CC.getCategories);
categoryRouter.get("/:id", CC.getCategoryById);
categoryRouter.get("/:id/discounts", CC.getCategoryDiscounts);

export default categoryRouter;