const express = require("express");
const { isAdmin } = require("../middleware/authMiddleware");
const {
	SignIn,
	Login,
	UpdateUser,
	DeleteUser,
	GetUserProfile,
	GetAllUsers,
	GetUserById,
	UpdateUserByAdmin,
} = require("../post/user/user.controller");
const { refreshToken } = require("../token/refreshToken");
const { verifyToken } = require("../token/verifyToken");

const router = express.Router();

/* GET users listing. */
router.post("/register", SignIn);
router.post("/login", Login);
router.get("/profile/:id", verifyToken, GetUserProfile);
router.put("/update", verifyToken, UpdateUser);
router.post("/refresh-token", refreshToken);

//  for admin only
router.get("/admin/all", verifyToken, isAdmin, GetAllUsers);
router.put("/admin/update/:id", verifyToken, isAdmin, UpdateUserByAdmin);
router.delete("/admin/delete/:id", verifyToken, isAdmin, DeleteUser);

module.exports = router;
