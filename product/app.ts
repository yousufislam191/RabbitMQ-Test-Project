import express, { Application, Request, Response } from "express";
import productRouter from "./routes/products.routes";

const app: Application = express();
app.use(express.json());

// RPCObserver("PRODUCT_RPC", productDummyData);

app.use("/api/product", productRouter);

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json("Product Service running.");
});

export { app };
