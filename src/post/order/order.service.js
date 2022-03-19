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

// * admin
module.exports.getOrders = async (limit, page) => {
	const count = await OrderModel.countDocuments({});
	const orders = await OrderModel.find({})
		.limit(limit)
		.skip((page - 1) * limit);
	return { orders, page, pages: Math.ceil(count / limit) };
};
