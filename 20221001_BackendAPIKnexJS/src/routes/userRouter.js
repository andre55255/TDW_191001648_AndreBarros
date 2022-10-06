const router = require("express").Router();
const { validationSave } = require("../validations/user/save");
const { validationRequest } = require("../middlewares/validationRequest");
const userController = require("../controllers/userController");

router.post("/", validationSave, validationRequest, userController.create);

module.exports = router;