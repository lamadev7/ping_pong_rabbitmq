require('dotenv').config();
const express = require('express');
const amqp = require('amqplib');

const app = express();
const PORT = 3000;

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

// Check RabbitMQ connection
async function checkRabbitMQConnection() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        console.log("RabbitMQ connected successfully");
        await connection.close();
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error.message);
    }
}

// Send pong Message
async function pingController(req, res) {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    channel.sendToQueue(QUEUE_NAME, Buffer.from('ping'));
    res.send({ message: "Sent to consumer queue!" })
}

app.get('/ping', pingController);

app.listen(PORT, async () => {
    await checkRabbitMQConnection();
    console.log(`Server running on port ${PORT}`);
});