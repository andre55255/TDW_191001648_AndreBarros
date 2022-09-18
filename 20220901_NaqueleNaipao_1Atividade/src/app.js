const express = require("express");
const app = express();
require("dotenv").config();

const publicRoutes = require("./routes/publicRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static("public"));

app.use("/", publicRoutes);

module.exports = app;