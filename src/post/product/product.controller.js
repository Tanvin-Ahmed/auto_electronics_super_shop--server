const mongoose = require("mongoose");
const {
	addProduct,
	getSingleProduct,
	getProducts,
	updateProduct,
	deleteSingleProduct,
	deleteProducts,
} = require("./product.service");

module.exports.AddProduct = async (req, res) => {
	try {
		const data = req.body;
		const product = await addProduct(data);
		return res.status(200).json(product);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Ops! Product not add in database.", error });
	}
};

module.exports.GetSingleProduct = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const product = await getSingleProduct(id);
		return res.status(200).json(product);
	} catch (error) {
		return res
			.status(404)
			.json({ message: "Ops! could not find product.", error });
	}
};

module.exports.GetProducts = async (req, res) => {
	try {
		let { limit, page } = req.params;
		limit = parseInt(limit, 10);
		page = parseInt(page, 10);
		const products = await getProducts(limit, page);
		return res.status(200).json(products);
	} catch (error) {
		return res
			.status(404)
			.json({ message: "Ops! could not find any product.", error });
	}
};

module.exports.UpdateProduct = async (req, res) => {
	try {
		const info = req.body;
		const id = mongoose.Types.ObjectId(req.params.id);
		const updatedProduct = await updateProduct(id, info);
		return res.status(200).json(updatedProduct);
	} catch (error) {
		return res.status(500).json({ message: "Ops! Product not update.", error });
	}
};

module.exports.DeleteSingleProduct = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const deleted = await deleteSingleProduct(id);
		return res.status(200).json(deleted);
	} catch (error) {
		return res
			.status(404)
			.json({ message: "Ops! Product not deleted.", error });
	}
};

module.exports.DeleteProducts = async (req, res) => {
	try {
		const data = req.params.data;
		const deleted = await deleteProducts(data);
		return res.status(200).json(deleted.deletedCount);
	} catch (error) {
		return res
			.status(404)
			.json({ message: "Ops! Products not deleted.", error });
	}
};
