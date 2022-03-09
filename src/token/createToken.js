const jwt = require("jsonwebtoken");
const { app } = require("../config/config");

module.exports.generateToken = data => {
	return jwt.sign({ data }, app.jwt_secret, { expiresIn: "5d" });
};
