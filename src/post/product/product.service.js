const ProductModel = require("./product.model");

module.exports.addProduct = async product => {
	return await ProductModel.create(product);
};

module.exports.getProducts = async (limit, page) => {
	return await ProductModel.find({})
		.limit(limit)
		.skip((page - 1) * limit);
};

module.exports.getSingleProduct = async id => {
	return await ProductModel.findById(id);
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
