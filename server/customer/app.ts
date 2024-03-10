import express, { Application, Request, Response } from "express";
import customerRouter from "./routes/customers.routes";
import { RPCObserver } from "../rpc";
import { customerDummyData } from "./data";

const app: Application = express();
app.use(express.json());

RPCObserver("CUSTOMER_RPC", customerDummyData);

app.use("/api/product", customerRouter);

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json("Customer Service running.");
});

export { app };
