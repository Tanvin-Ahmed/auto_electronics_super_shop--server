const express = require("express");
const {
	AddProduct,
	GetSingleProduct,
	GetProducts,
	UpdateProduct,
	DeleteSingleProduct,
	DeleteProducts,
	AddProductReview,
	GetSearchedProducts,
	GetTopRatedProducts,
} = require("../post/product/product.controller");
const { verifyToken } = require("../token/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.get("/get-single/:id", GetSingleProduct);
Router.get("/get-many/:limit/:page", GetProducts);
Router.get("/get-top-rated", GetTopRatedProducts);
Router.put("/add-review/:id", verifyToken, AddProductReview);

//* admin routes */
Router.post("/admin/add", verifyToken, isAdmin, AddProduct);
Router.put("/admin/update/:id", verifyToken, isAdmin, UpdateProduct);
Router.delete(
	"/admin/delete-single/:id",
	verifyToken,
	isAdmin,
	DeleteSingleProduct
);
Router.delete("/admin/delete-many/:data", verifyToken, isAdmin, DeleteProducts);

module.exports = Router;
