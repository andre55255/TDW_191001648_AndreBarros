const express = require("express");
const app = express();
require("dotenv").config();
const { logger } = require("./middlewares/logger");

const PORT_SERVER = process.env.PORT_SERVER || 8081;

// Middlewares Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Cors
const cors = require("cors");
app.use(cors());

// Routes
const accRouter = require("./routes/accountRouter");
const catRouter = require("./routes/categoryRouter");
const movementRouter = require("./routes/movementRouter");
const orderPadRouter = require("./routes/orderPadRouter");
const orderPadItemRouter = require("./routes/orderPadItemRouter");
const productRouter = require("./routes/productRouter");
const roleRouter = require("./routes/roleRouter");
const unitOfMeasRouter = require("./routes/unitOfMeasurementRouter");
const userRouter = require("./routes/userRouter");

app.use("/account", accRouter);
app.use("/category", catRouter);
app.use("/movement", movementRouter);
app.use("/orderPad", orderPadRouter);
app.use("/orderPadItem", orderPadItemRouter);
app.use("/product", productRouter);
app.use("/role", roleRouter);
app.use("/unitOfMeasurement", unitOfMeasRouter);
app.use("/user", userRouter);

app.listen(PORT_SERVER, () => logger.info(`Listening in port ${PORT_SERVER}`));