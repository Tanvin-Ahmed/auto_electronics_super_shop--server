const jwt = require("jsonwebtoken");
const { app } = require("../config/config");

module.exports.refreshToken = async (req, res) => {
	try {
		const token = req.body;
		const verified = await jwt.verify(token, app.jwt_secret);
		if (verified) {
			const newToken = await jwt.sign({ data: verified.data }, app.jwt_secret, {
				expiresIn: "5h",
			});
			return res.status(200).json(newToken);
		}
	} catch (error) {
		return res
			.status(400)
			.json({ message: "Ops! refreshToken not created", error });
	}
};
