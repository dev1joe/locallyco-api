import { Router } from "express";
import * as DC from "@src/controllers/v1/discount.controller";

const discountRouter = Router();

discountRouter.get("/", DC.getDiscounts);

export default discountRouter;