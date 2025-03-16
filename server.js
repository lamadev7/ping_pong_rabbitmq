require('dotenv').config();
const express = require('express');
const amqp = require('amqplib');

const app = express();
const PORT = 3000;

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
const ROUTING_KEY = process.env.ROUTING_KEY;

// Check RabbitMQ connection
async function checkRabbitMQConnection() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        console.log("RabbitMQ connected successfully");
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error.message);
    }
}

// Send Ping Message to the Topic Exchange
async function pingController() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'topic');  // Declare topic exchange
    channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from('ping'));  // Publish with routing key
    console.log(`Sent: ping to exchange ${EXCHANGE_NAME} with routing key ${ROUTING_KEY}`);
    setTimeout(() => connection.close(), 1000);
}

app.get('/ping', pingController);

app.listen(PORT, async () => {
    await checkRabbitMQConnection();
    console.log(`Server running on port ${PORT}`);
});