const router = require("express").Router();
const { validationSave } = require("../validations/user/save");
const { validationId } = require("../validations/utils/id");
const { validationRequest } = require("../middlewares/validationRequest");
const userController = require("../controllers/userController");

router.post("/", validationSave, validationRequest, userController.create);

router.get("/:id", validationId, validationRequest, userController.getById);

router.get("/", userController.getAll);

module.exports = router;