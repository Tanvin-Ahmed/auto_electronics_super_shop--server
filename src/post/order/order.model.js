const mongoose = require("mongoose");
const { app } = require("../../config/config");

const OrderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: app.user_collection,
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: app.product_collection,
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: { type: String, required: true },
		paymentResult: {
			id: { type: String },
			status: { type: String },
			updateTime: { type: String },
			emailAddress: { type: String },
		},
		itemsPrice: { type: Number, required: true, default: 0.0 },
		taxPrice: { type: Number, required: true, default: 0.0 },
		shippingPrice: { type: Number, required: true, default: 0.0 },
		totalPrice: { type: Number, required: true, default: 0.0 },
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date, default: new Date().toUTCString() },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: {
			type: Date,
			default: new Date().toUTCString(),
		},
		transactionId: { type: String, default: "" },
		valId: { type: String, default: "" },
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model(app.order_collection, OrderSchema);
