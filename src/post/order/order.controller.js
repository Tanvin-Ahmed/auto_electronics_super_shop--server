const mongoose = require("mongoose");
const {
	createOrder,
	getOrder,
	updateOrder,
	getMyOrders,
} = require("./order.service");

module.exports.CreateOrder = async (req, res) => {
	try {
		const orderInfo = { ...req.body, user: req.user._id };
		if (orderInfo.orderItems && orderInfo.orderItems.length === 0) {
			return res.status(404).json({ message: "Ops! No order items found" });
		}
		const createdOrder = await createOrder(orderInfo);
		return res.status(201).json(createdOrder);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Ops! Order not created" });
	}
};

module.exports.GetOrder = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const order = await getOrder(id);
		res.status(200).json(order);
	} catch (error) {
		res.status(404).json({ message: "Ops! order not found", error });
	}
};

module.exports.UpdateOrderToPaid = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const order = await getOrder(id);

		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				updateTime: req.body.updateTime,
				emailAddress: req.body.email,
			};

			const updatedOrder = await updateOrder(order);
			res.status(200).json(updatedOrder);
		} else {
			res.status(404).json({ message: "Ops! Order not found" });
		}
	} catch (error) {
		res.status(400).json({ message: "Ops! Order not update" });
	}
};

module.exports.GetMyOrders = async (req, res) => {
	try {
		const user = mongoose.Types.ObjectId(req.user._id);
		const orders = await getMyOrders(user);
		return res.status(200).json(orders);
	} catch (error) {
		return res.status(404).json({ message: "Ops! Orders not found" });
	}
};
