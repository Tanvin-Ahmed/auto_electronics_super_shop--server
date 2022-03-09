const mongoose = require("mongoose");
const { addUser, updateUser, deleteUser, getUser } = require("./user.service");

module.exports.AddUser = async (req, res) => {
	try {
		const data = req.body;
		const user = await addUser(data);
		return res.status(200).json(user);
	} catch (error) {
		return res
			.status(500)
			.json({ error: error, message: "Ops! User not created" });
	}
};

module.exports.GetUser = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const user = await getUser(id);
		return res.status(200).json(user);
	} catch (error) {
		return res
			.status(500)
			.json({ error: error, message: "Ops! User not created" });
	}
};

module.exports.UpdateUser = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const data = req.body;
		const user = await updateUser(id, data);
		return res.status(200).json(user);
	} catch (error) {
		return res
			.status(500)
			.json({ error: error, message: "Ops! User not updated" });
	}
};

module.exports.DeleteUser = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const user = await deleteUser(id);
		return res.status(200).json(user);
	} catch (error) {
		return res
			.status(500)
			.json({ error: error, message: "Ops! User not deleted" });
	}
};
