import { Request, Response } from "express";
import { RPCRequest } from "../../rpc";

const requestProductData = async (req: Request, res: Response) => {
  try {
    const requestPayload = {
      productId: "yt686tu8763tyyr98734",
    };

    const responseData = await RPCRequest("PRODUCT_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { requestProductData };
