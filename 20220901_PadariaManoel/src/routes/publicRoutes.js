const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const basepath = path.dirname(__dirname);

router.get("/", (req, res) => {
    return res.status(200).sendFile(basepath + "/views/index.html");
});

router.post("/sendMessage", (req, res) => {
    const data = req.body;

    fs.appendFile(basepath + "/db/data.txt", JSON.stringify(data) + "\n", (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "Falha ao armazenar dados"
            });
        }
    });

    return res.status(200).json({
        success: true,
        message: "Mensagem armazenada com sucesso"
    });
});

module.exports = router;