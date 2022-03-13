const express = require("express");
const {
	SignIn,
	Login,
	UpdateUser,
	DeleteUser,
	GetUserProfile,
} = require("../post/user/user.controller");
const { refreshToken } = require("../token/refreshToken");
const { verifyToken } = require("../token/verifyToken");

const router = express.Router();

/* GET users listing. */
router.post("/register", SignIn);
router.post("/login", Login);
router.get("/profile/:email", verifyToken, GetUserProfile);
router.put("/update", verifyToken, UpdateUser);
router.delete("/delete", verifyToken, DeleteUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
