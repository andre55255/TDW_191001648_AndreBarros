const express = require("express");
const app = express();

require("dotenv").config();
const PORT_SERVER = process.env.PORT_SERVER || 8081;

app.use(express.static("public"));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    return res.status(200).sendFile(__dirname + "/views/index.html");
});

app.listen(PORT_SERVER, () => console.log(`Listening port ${PORT_SERVER}`));