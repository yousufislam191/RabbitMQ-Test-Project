import express, {Application, Request, Response } from 'express';
import amqp from 'amqplib/callback_api';

const app:Application = express();
app.use(express.json());

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'messages';

app.post('/send', (req: Request, res: Response) => {
    const message = req.body;

    amqp.connect(RABBITMQ_URL, (error, connection) => {
        if (error) {
            throw error;
        }

        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }

            channel.assertQueue(QUEUE_NAME, { durable: false });
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

            console.log('Message sent to queue:', message);
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    });

    return res.status(200).send({response:'Message sent to service2'});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Service1 listening at http://localhost:${PORT}`);
});
