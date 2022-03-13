const express = require("express");
const { makePaymentIntent } = require("../paymentMethod/payWithStripe");
const {
	CreateOrder,
	GetOrder,
	UpdateOrderToPaid,
} = require("../post/order/order.controller");
const { verifyToken } = require("../token/verifyToken");
const route = express.Router();

route.post("/make-order", verifyToken, CreateOrder);
route.get("/get/:id", verifyToken, GetOrder);

// payment
route.post("/create-payment-intent", verifyToken, makePaymentIntent);
route.put("/pay/:id", verifyToken, UpdateOrderToPaid);

module.exports = route;
