import { Request, Response } from "express";
import * as PS from "../services/product.service.ts";

export function getProducts(req: Request, res: Response) {
    res.json({"result": PS.getProducts()});
}