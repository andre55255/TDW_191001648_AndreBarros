const express = require("express");
const app = express();

// Config middlewares request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Routes
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/user");

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/role", roleRouter);
app.use("/user", userRouter);

module.exports = app;