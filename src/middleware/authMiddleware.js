module.exports.isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).json({ message: "Ops! Not authorized as an admin" });
	}
};
