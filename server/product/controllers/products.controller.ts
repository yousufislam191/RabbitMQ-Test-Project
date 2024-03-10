import { Request, Response } from "express";
import { RPCRequest } from "../../rpc";

const requestCustomerData = async (req: Request, res: Response) => {
  //   return res.status(200).json("Product Service controller response.");
  try {
    const requestPayload = {
      customerId: "yt686tu8763tyyr98734",
    };

    const responseData = await RPCRequest("CUSTOMER_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { requestCustomerData };
