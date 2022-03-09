const express = require("express");
const {
	AddProduct,
	GetSingleProduct,
	GetProducts,
	UpdateProduct,
	DeleteSingleProduct,
	DeleteProducts,
} = require("../post/product/product.controller");

const Router = express.Router();

Router.post("/add", AddProduct);
Router.get("/get-single/:id", GetSingleProduct);
Router.get("/get-many/:limit/:page", GetProducts);
Router.put("/update/:id", UpdateProduct);
Router.delete("/delete-single/:id", DeleteSingleProduct);
Router.delete("/delete-many/:data", DeleteProducts);

module.exports = Router;
