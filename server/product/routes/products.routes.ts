import { Router } from "express";
import { requestCustomerData } from "../controllers/products.controller";

const productRouter = Router();

productRouter.get("/", requestCustomerData);

export default productRouter;
