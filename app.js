const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("colors");
require("./src/db/db");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const productsRouter = require("./src/routes/productRoutes");
const orderRouter = require("./src/routes/orderRoutes");
const {
	pathNotFound,
	errorHandler,
} = require("./src/middleware/errorhandlerMiddleware");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);
app.use("/order", orderRouter);

// Error handler
app.use(pathNotFound);
app.use(errorHandler);

module.exports = app;
