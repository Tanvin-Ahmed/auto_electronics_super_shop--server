const { app } = require("../config/config");
const stripe = require("stripe")(app.stripe_secret);

module.exports.makePaymentIntent = async (req, res) => {
	try {
		const paymentInfo = req.body;
		const amount = Number(paymentInfo.price) * 100;
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});
		return res.status(200).json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {}
};
