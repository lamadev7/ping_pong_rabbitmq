## Project Overview

- **Producer (server.js)**: 
  - Express.js API sends a "ping" message to a topic exchange in RabbitMQ when a user accesses the `/ping` endpoint.
  
- **Consumer (consumer.js)**:
  - Listens to the topic exchange for messages with the routing key `ping` and responds by printing "pong" in the console.


## Requirements

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
- **RabbitMQ**: Make sure you have RabbitMQ running. You can use Docker to start RabbitMQ with management UI.

### Starting RabbitMQ with Docker
- To run RabbitMQ using Docker, use the following command:

  ```bash
  docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672     rabbitmq:management

## Setup

### 1. Clone the repository

- Clone the repository to your local machine: 
  ```bash
  git clone <repository-url>
  cd <project-directory>

### 2. Create .env file
- ```bash
  RABBITMQ_URL=amqp://localhost  #The URL of your RabbitMQ server
  EXCHANGE_NAME=ping_pong_exchange #The name of the topic exchange you are using
  ROUTING_KEY=ping   #The routing key to bind the consumer to the messages

### 3. Run the Consumer
- ```bash
    node src/consumer.js

- Note: In one terminal window, run the consumer to listen for messages from RabbitMQ. This will start the consumer that listens for messages on the ping_pong_exchange topic exchange.

### 4. Run the Producer
- ```bash
    npm start
- Note: In another terminal window, run the Express API server to send messages to RabbitMQ. This will start the Express server on port 3000. The server will listen for requests on the /ping endpoint.

### 4. Run the Producer
- Once the server is running, open your browser or use curl to make a request to the /ping endpoint:
  ```bash
    curl http://localhost:3000/ping
- When you access the /ping endpoint, the producer will send a "ping" message to RabbitMQ, and the consumer will receive it and log "Received: ping". The consumer will then print "Sent: pong" as a simulated response.

### 5. Verify the Output
- Producer (server.js): You should see the following message in the console when you hit the /ping endpoint:
  ```bash
    Sent: ping to exchange ping_pong_exchange with routing key ping

- Consumer (consumer.js): You should see the following output in the consumer's terminal:
  ```bash
    Waiting for messages with routing key: ping
    Received: ping
    Sent: pong

