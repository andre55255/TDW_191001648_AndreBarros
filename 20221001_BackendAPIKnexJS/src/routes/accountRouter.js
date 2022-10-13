const router = require("express").Router();
const { validationLogin } = require("../validations/account/login");
const { validationRequest } = require("../middlewares/validationRequest");
const accController = require("../controllers/accountController");
const { authorize } = require("../middlewares/authorize");

router.post("/login", validationLogin, validationRequest, accController.login);

router.get("/userInfo", authorize, accController.userInfo);

module.exports = router;