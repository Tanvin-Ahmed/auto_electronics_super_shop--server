const UserModel = require("./user.model");

module.exports.addUser = async user => {
	return await UserModel.create(user);
};

module.exports.getUser = async id => {
	return await UserModel.findById(id);
};

module.exports.updateUser = async (id, user) => {
	return await UserModel.findByIdAndUpdate(id, user);
};

module.exports.deleteUser = async id => {
	return await UserModel.findByIdAndDelete(id);
};
