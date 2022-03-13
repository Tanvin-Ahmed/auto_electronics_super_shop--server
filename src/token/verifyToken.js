const jwt = require("jsonwebtoken");
const { app } = require("../config/config");

module.exports.verifyToken = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const token = authorization.split(" ")[1];
		const verify = await jwt.verify(token, app.jwt_secret);
		if (verify) {
			req.user = verify?.data;
			return next();
		} else {
			return res.status(403).json({ message: "Ops! UnAuthorized request" });
		}
	} catch (error) {
		return res
			.status(403)
			.json({ message: "Ops! UnAuthorized request", error });
	}
};
