const OrderModel = require("./order.model");
const mongoose = require("mongoose");
const { app } = require("../../config/config");

module.exports.createOrder = async orderInfo => {
	return await OrderModel.create(orderInfo);
};

module.exports.getOrder = async id => {
	return await OrderModel.findById(id).populate({
		path: `${app.user_collection}`,
		select: "email name",
	});
};

module.exports.getMyOrders = async user => {
	return await OrderModel.find({ user });
};

module.exports.updateOrder = async orderInfo => {
	const id = mongoose.Types.ObjectId(orderInfo._id);
	return await OrderModel.findByIdAndUpdate(id, orderInfo, {
		new: true,
	});
};

module.exports.deleteOrder = async id => {
	return await OrderModel.findByIdAndDelete(id);
};
