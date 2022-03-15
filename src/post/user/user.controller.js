const mongoose = require("mongoose");
const {
	addUser,
	updateUser,
	deleteUser,
	getUser,
	getAllUsers,
	getUserById,
} = require("./user.service");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../token/createToken");

const getHashedPassword = (password, saltRound) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRound, function (err, salt) {
			if (err) reject(err);
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) reject(err);
				else resolve(hash);
			});
		});
	});
};

module.exports.SignIn = async (req, res) => {
	try {
		let data = req.body;
		const hashedPassword = await getHashedPassword(data.password, 10);
		data = { ...data, password: hashedPassword };
		let user = await addUser(data);
		user = JSON.parse(JSON.stringify(user));
		delete user.password;
		const token = generateToken(user);
		return res.status(200).json({ ...user, token });
	} catch (error) {
		if (error.keyValue.email) {
			return res.status(403).json({ message: "Ops! User Already exists" });
		}
		return res
			.status(401)
			.json({ error: error, message: "Ops! SignIn failed" });
	}
};

module.exports.Login = async (req, res) => {
	try {
		const data = req.body;
		let user = await getUser(data.email);
		user = JSON.parse(JSON.stringify(user));
		const matchedPassword = await bcrypt.compare(data.password, user.password);
		delete user.password;
		if (matchedPassword) {
			const token = generateToken(user);
			return res.status(200).json({ ...user, token });
		}
	} catch (error) {
		return res.status(401).json({ error: error, message: "Ops! Login failed" });
	}
};

module.exports.GetUserProfile = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const user = await getUserById(id);
		delete user.password;
		res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({ message: "Ops! User not found" });
	}
};

module.exports.UpdateUser = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.body._id);
		const data = req.body;
		if (data.password) {
			data.password = await getHashedPassword(data.password, 10);
		}
		let user = await updateUser(id, data);
		user = JSON.parse(JSON.stringify(user));
		delete user.password;
		const token = generateToken(user);
		return res.status(200).json({ ...user, token });
	} catch (error) {
		return res
			.status(500)
			.json({ error: error, message: "Ops! User not updated" });
	}
};

//************* For admin *************//

module.exports.GetAllUsers = async (req, res) => {
	try {
		const allUsers = await getAllUsers();
		return res.status(200).json(allUsers);
	} catch (error) {
		return res.status(404).json({ message: "Ops! Users not found", error });
	}
};

module.exports.UpdateUserByAdmin = async (req, res) => {
	try {
		const id = mongoose.Types.ObjectId(req.params.id);
		const info = req.body;
		const updatedUser = await updateUser(id, info);
		return res.status(200).json(updatedUser);
	} catch (error) {
		return res.status(500).json({ message: "Ops! User not update", error });
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
