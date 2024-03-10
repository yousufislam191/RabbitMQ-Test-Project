import express, { Application, Request, Response } from "express";
import customerRouter from "./routes/customers.routes";

const app: Application = express();
app.use(express.json());

// RPCObserver("CUSTOMER_RPC", customerDummyData);

app.use("/api/customer", customerRouter);

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json("Customer Service running.");
});

export { app };
