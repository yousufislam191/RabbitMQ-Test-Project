import { Request, Response } from "express";
import { RPCObserver, RPCRequest } from "../../rpc";
import { v4 as uuidv4 } from "uuid";

const sendCustomerData = async (req: Request, res: Response) => {
  try {
    const { name, country, gender } = req.body;
    const customerData = {
      _id: uuidv4(),
      name: name,
      country: country,
      gender: gender,
    };
    RPCObserver("CUSTOMER_RPC", customerData);
    return res.status(200).json({
      message: "Customer Data send successfully",
      data: customerData._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const requestProductData = async (req: Request, res: Response) => {
  try {
    const requestPayload: string = req.params.id;

    const responseData = await RPCRequest("PRODUCT_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { sendCustomerData, requestProductData };
