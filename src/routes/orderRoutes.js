const express = require("express");
const { isAdmin } = require("../middleware/authMiddleware");
const { makePaymentIntent } = require("../paymentMethod/payWithStripe");
const {
	CreateOrder,
	GetOrder,
	UpdateOrderToPaid,
	GetMyOrders,
	GetOrders,
} = require("../post/order/order.controller");
const { verifyToken } = require("../token/verifyToken");
const route = express.Router();

route.post("/make-order", verifyToken, CreateOrder);
route.get("/get/:id", verifyToken, GetOrder);
route.get("/get-my-orders", verifyToken, GetMyOrders);

// payment
route.post("/create-payment-intent", verifyToken, makePaymentIntent);
route.put("/pay/:id", verifyToken, UpdateOrderToPaid);

// * admin
route.get("/admin/get-all", verifyToken, isAdmin, GetOrders);

module.exports = route;
