const ProductModel = require("./product.model");

module.exports.addProduct = async product => {
	return await ProductModel.create(product);
};

module.exports.getProducts = async (limit, page, keyword) => {
	const count = await ProductModel.countDocuments({ ...keyword });
	const products = await ProductModel.find({ ...keyword })
		.limit(limit)
		.skip((page - 1) * limit);
	return { products, page, pages: Math.ceil(count / limit) };
};

module.exports.getSingleProduct = async id => {
	return await ProductModel.findById(id);
};

module.exports.getTopRatedProduct = async () => {
	return await ProductModel.find({}).sort({ rating: -1 }).limit(3);
};

module.exports.updateProduct = async (id, info) => {
	return await ProductModel.findByIdAndUpdate(id, info, { new: true });
};

module.exports.deleteSingleProduct = async id => {
	return await ProductModel.findByIdAndDelete(id);
};

module.exports.deleteProducts = async data => {
	return await ProductModel.deleteMany(data);
};
