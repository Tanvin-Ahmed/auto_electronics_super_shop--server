const mongoose = require("mongoose");
const {
	addProduct,
	getSingleProduct,
	getProducts,
	updateProduct,
	deleteSingleProduct,
	deleteProducts,
	getSearchedProducts,
	getTopRatedProduct,
} = require("./product.service");

module.exports.AddProduct = async (req, res) => {
	try {
		const data = { ...req.body, admin: req.user._id };
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
		const keyword = req.query.keyword
			? {
					name: {
						$regex: req.query.keyword,
						$options: "i",
					},
			  }
			: {};
		let { limit, page } = req.params;
		limit = parseInt(limit, 10);
		page = parseInt(page, 10);
		const productsInfo = await getProducts(limit, page, keyword);
		return res.status(200).json(productsInfo);
	} catch (error) {
		return res
			.status(404)
			.json({ message: "Ops! could not find any product.", error });
	}
};

module.exports.GetTopRatedProducts = async (req, res) => {
	try {
		const products = await getTopRatedProduct();
		return res.status(200).json(products);
	} catch (error) {
		return res.status(404).json({ error, message: "!Ops. Products not found" });
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

module.exports.AddProductReview = async (req, res) => {
	try {
		const { rating, comment } = req.body;
		const productId = mongoose.Types.ObjectId(req.params.id);

		const product = await getSingleProduct(productId);

		if (product) {
			const alreadyReviewed = product.reviews.find(
				r => r.user === req.user._id
			);

			if (alreadyReviewed) {
				return res
					.status(400)
					.json({ message: "Ops! Product already reviewed" });
			} else {
				const review = {
					name: req.user.name,
					rating: Number(rating),
					comment,
					user: req.user._id,
				};

				product.reviews.push(review);
				product.numReviews = product.reviews.length;
				product.rating =
					product.reviews.reduce((acc, item) => item.rating + acc, 0) /
					product.reviews.length;

				const updatedProduct = await updateProduct(productId, product);
				return res.status(201).json(updatedProduct);
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Ops! something went wrong" });
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
