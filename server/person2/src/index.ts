import express, {Application, Request, Response } from 'express';
import amqp from 'amqplib/callback_api';

const app:Application = express();

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'messages';

app.get('/receive', (req: Request, res: Response) => {
    amqp.connect(RABBITMQ_URL, (error, connection) => {
        if (error) {
            throw error;
        }

        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }

            channel.assertQueue(QUEUE_NAME, { durable: false });
            channel.consume(
                QUEUE_NAME,
                (message) => {
                    if (message !== null) {
                        console.log('Received message:', message.content.toString());
                        res.status(200).send(JSON.parse(message.content.toString()));
                        channel.ack(message);
                    }
                },
                { noAck: false }
            );
        });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Service2 listening at http://localhost:${PORT}`);
});
