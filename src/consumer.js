require('dotenv').config();
const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
const ROUTING_KEY = process.env.ROUTING_KEY;

// Receive and process messages from the Topic Exchange
async function receiveMessage() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, 'topic'); // Declare topic exchange
    const q = await channel.assertQueue('', { exclusive: true });  // Create a temporary exclusive queue

    // Bind the queue to the exchange with the routing key
    channel.bindQueue(q.queue, EXCHANGE_NAME, ROUTING_KEY);

    console.log(`Waiting for messages with routing key: ${ROUTING_KEY}`);

    // Consume messages from the queue
    channel.consume(q.queue, (msg) => {
        if (msg !== null) {
            console.log(`Received: ${msg.content.toString()}`);
            channel.ack(msg);
            console.log("Sent: pong");
        }
    });
}

receiveMessage().catch(console.error);