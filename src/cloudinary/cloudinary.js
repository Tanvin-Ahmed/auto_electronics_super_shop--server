const cloudinary = require("cloudinary").v2;
const { app } = require("../config/config");

cloudinary.config({
	cloud_name: app.cloudinary_cloud_name,
	api_key: app.cloudinary_api_key,
	api_secret: app.cloudinary_api_secret,
});

module.exports = cloudinary;
