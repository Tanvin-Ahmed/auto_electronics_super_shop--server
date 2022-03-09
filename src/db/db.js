const mongoose = require("mongoose");
const { app } = require("../config/config");

const url = app.db_url;

if (!url) return console.log("URL not fount to connect with database!!!");

mongoose.connect(url, err => {
	if (err)
		return console.log(
			"Error to connect to database: " + err.message.red.underline.bold
		);
	console.log("Connect with database".cyan.underline);
});

module.exports = mongoose;
