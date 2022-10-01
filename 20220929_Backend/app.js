const express = require("express");
const app = express();

// Config middlewares request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Routes
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/category");

app.use("/product", productRouter);
app.use("/category", categoryRouter);

module.exports = app;