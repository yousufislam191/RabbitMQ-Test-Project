import { Request, Response } from "express";
import { RPCObserver, RPCRequest } from "../../rpc";
import { v4 as uuidv4 } from "uuid";

const sendProductData = async (req: Request, res: Response) => {
  try {
    const { title, price, model } = req.body;
    const productData = {
      _id: uuidv4(),
      title: title,
      price: price,
      model: model,
    };

    await RPCObserver("PRODUCT_RPC", productData);

    return res.status(200).json({
      message: "Product Data send successfully",
      data: productData._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const requestCustomerData = async (req: Request, res: Response) => {
  try {
    const requestPayload: string = req.params.id;

    const responseData = await RPCRequest("CUSTOMER_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { sendProductData, requestCustomerData };
