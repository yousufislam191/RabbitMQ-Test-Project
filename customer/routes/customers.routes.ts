import { Router } from "express";
import {
  requestProductData,
  sendCustomerData,
} from "../controllers/customers.controller";

const customerRouter = Router();

customerRouter.get("/getProduct/:id", requestProductData);
customerRouter.post("/", sendCustomerData);

export default customerRouter;
