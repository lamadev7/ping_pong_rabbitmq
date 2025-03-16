require('dotenv').config();
const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

async function receiveMessage() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);

    console.log("Waiting for messages...");
    channel.consume(QUEUE_NAME, (msg) => {
        if (msg !== null) {
            console.log(`Received: ${msg.content.toString()}`);
            channel.ack(msg);
            console.log("Sent: pong");
        }
    });
}

receiveMessage().catch(console.error);
