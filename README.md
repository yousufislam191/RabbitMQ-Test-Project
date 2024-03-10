## Documentation

In this project, there has been used Microservice Architecture where `RabbitMQ` has been integrated as a Message Broker to communicate with Customer Service and Product Service. Both services are running individually on different ports.

In this Backend project there are 2 routes which are:

1. For customer: `GET http://localhost:3000/api/product`

2. For product: `GET http://localhost:3001/api/customer`

The 1st API will return the product details and the 2nd will return the customer details from the RabbitMQ server queue.

### Dummy Data that will be returned

**Customer Data:**

```js
_id: "yt686tu8763tyyr98734",
name: "Mike",
country: "Poland",
gender: "Male",
```

**Product Data:**

```js
_id: "yt686tu8763tyyr98734",
title: "iPhone",
price: 600,
model: "14 Pro Max",
```
