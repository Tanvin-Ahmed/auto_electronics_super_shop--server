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
module.exports.getAllUsers = async () => {
	return await UserModel.find({}).select("-password");
};
