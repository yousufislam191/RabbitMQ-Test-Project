import { Router } from "express";
import {
  requestCustomerData,
  sendProductData,
} from "../controllers/products.controller";

const productRouter = Router();

productRouter.get("/getCustomer/:id", requestCustomerData);
productRouter.post("/", sendProductData);

export default productRouter;
