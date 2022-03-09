module.exports.app = {
	db_url: process.env.DB_URL,
	product_collection: process.env.PRODUCT_COLLECTION,
	user_collection: process.env.USER_COLLECTION,
	order_collection: process.env.ORDER_COLLECTION,
	jwt_secret: process.env.JWT_SECRET,
};
