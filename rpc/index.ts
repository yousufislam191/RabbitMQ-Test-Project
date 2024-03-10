import amqplib from "amqplib";
import { v4 as uuidv4 } from "uuid";

let amqplibConnection: any = null;

// Get the channel
const getChannel = async () => {
  if (amqplibConnection === null) {
    amqplibConnection = await amqplib.connect("amqp://localhost");
  }
  return await amqplibConnection.createChannel();
};

// For Database Operations
const expensiveDBOperation = (
  payload: any,
  fakeResponse: any
): Promise<any> => {
  console.log(payload);
  console.log(fakeResponse);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeResponse);
    }, 1000);
  });
};

const RPCObserver = async (
  RPC_QUEUE_NAME: string,
  fakeResponse: any
): Promise<void> => {
  const channel = await getChannel();

  await channel.assertQueue(RPC_QUEUE_NAME, {
    durable: false,
  });

  channel.prefetch(1);

  channel.consume(
    RPC_QUEUE_NAME,
    async (msg: any) => {
      if (msg.content) {
        const payload = JSON.parse(msg.content.toString());
        const response = await expensiveDBOperation(payload, fakeResponse);

        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        channel.ack(msg);
      }
    },
    {
      noAck: false,
    }
  );
};

// Request for Data
const requestData = async (
  RPC_QUEUE_NAME: string,
  requestPayload: any,
  uuid: string
): Promise<any> => {
  try {
    const channel = await getChannel();

    const q = await channel.assertQueue("", {
      exclusive: true,
    });

    channel.sendToQueue(
      RPC_QUEUE_NAME,
      Buffer.from(JSON.stringify(requestPayload)),
      {
        replyTo: q.queue,
        correlationId: uuid,
      }
    );

    return new Promise((resolve, reject) => {
      // timeout n
      const timeout = setTimeout(() => {
        channel.close();
        resolve("API could not fulfill the request!");
      }, 8000);

      channel.consume(
        q.queue,
        (msg: any) => {
          if (msg.properties.correlationId == uuid) {
            resolve(JSON.parse(msg.content.toString()));
            clearTimeout(timeout);
          } else {
            reject("data Not found!");
          }
        },
        {
          noAck: true,
        }
      );
    });
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const RPCRequest = async (
  RPC_QUEUE_NAME: string,
  requestPayload: any
): Promise<any> => {
  const uuid = uuidv4();
  return await requestData(RPC_QUEUE_NAME, requestPayload, uuid);
};

export { getChannel, RPCObserver, RPCRequest };
