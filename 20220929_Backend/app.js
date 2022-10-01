const express = require("express");
const app = express();

// Config middlewares request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Routes
const productRouter = require("./routes/products");

app.use("/product", productRouter);

module.exports = app;