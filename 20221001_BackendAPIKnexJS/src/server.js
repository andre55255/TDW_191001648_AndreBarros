const express = require("express");
const app = express();
require("dotenv").config();
const { logger } = require("./middlewares/logger");

const PORT_SERVER = process.env.PORT_SERVER || 8081;

// Middlewares Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const accRouter = require("./routes/accountRouter");
const catRouter = require("./routes/categoryRouter");
const roleRouter = require("./routes/roleRouter");
const unitOfMeasRouter = require("./routes/unitOfMeasurementRouter");
const userRouter = require("./routes/userRouter");

app.use("/account", accRouter);
app.use("/category", catRouter);
app.use("/role", roleRouter);
app.use("/unitOfMeasument", unitOfMeasRouter);
app.use("/user", userRouter);

app.listen(PORT_SERVER, () => logger.info(`Listening in port ${PORT_SERVER}`));