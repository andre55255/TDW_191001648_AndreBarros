const router = require("express").Router();
const { validationLogin } = require("../validations/account/login");
const { validationRequest } = require("../middlewares/validationRequest");
const accController = require("../controllers/accountController");

router.post("/login", validationLogin, validationRequest, accController.login);

module.exports = router;