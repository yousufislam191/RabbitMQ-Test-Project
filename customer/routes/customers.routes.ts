import { Router } from "express";
import { requestProductData } from "../controllers/customers.controller";

const customerRouter = Router();

customerRouter.get("/", requestProductData);

export default customerRouter;
