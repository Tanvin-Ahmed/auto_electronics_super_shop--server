var express = require("express");
const {
	AddUser,
	GetUser,
	UpdateUser,
	DeleteUser,
} = require("../post/user/user.controller");
var router = express.Router();

/* GET users listing. */
router.post("/add", AddUser);
router.get("/get", GetUser);
router.put("/update", UpdateUser);
router.delete("/delete", DeleteUser);

module.exports = router;
