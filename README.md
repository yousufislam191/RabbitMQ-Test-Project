## Documentation

In this project, there has been used Microservice Architecture where `RabbitMQ` has been integrated as a Message Broker to communicate with Customer Service and Product Service. Both services are running individually on different ports.

In this Backend project, there are 4 routes which are:

1. **For customer:**

   - `GET http://localhost:3000/api/customer/getProduct/:id` : For getting product data
   - `POST http://localhost:3000/api/customer` : For sending customer data

2. **For product:**
   - `GET http://localhost:3001/api/product/getCustomer/:id` : For getting customer data
   - `POST http://localhost:3001/api/product` : For sending product data

### Example of Data

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
