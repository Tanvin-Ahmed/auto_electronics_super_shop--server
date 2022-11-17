module.exports.app = {
  db_url: process.env.DB_URL,
  product_collection: process.env.PRODUCT_COLLECTION,
  user_collection: process.env.USER_COLLECTION,
  order_collection: process.env.ORDER_COLLECTION,
  feedback_collection: process.env.FEEDBACK_COLLECTION,
  jwt_secret: process.env.JWT_SECRET,
  stripe_secret: process.env.STRIPE_SECRET,
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
};
