const UserModel = require("./user.model");

module.exports.addUser = async user => {
	return await UserModel.create(user);
};

//* login */
module.exports.getUser = async email => {
	return await UserModel.findOne({ email });
};

module.exports.getUserById = async id => {
	return await UserModel.findById(id).select("-password");
};

module.exports.updateUser = async (id, user) => {
	return await UserModel.findByIdAndUpdate(id, user, { new: true });
};

module.exports.deleteUser = async id => {
	return await UserModel.findByIdAndDelete(id);
};

//************ For Admin ************//
module.exports.getAllUsers = async (page, limit) => {
	const count = await UserModel.countDocuments({});
	const users = await UserModel.find({})
		.limit(limit)
		.skip((page - 1) * limit)
		.select("-password");
	return { users, page, pages: Math.ceil(count / limit) };
};
