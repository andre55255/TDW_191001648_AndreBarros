const router = require("express").Router();
const { validationSave } = require("../validations/user/save");
const { validationId } = require("../validations/utils/id");
const { validationRequest } = require("../middlewares/validationRequest");
const { authorize } = require("../middlewares/authorize");
const userController = require("../controllers/userController");

router.post("/", authorize, validationSave, validationRequest, userController.create);

router.get("/:id", authorize, validationId, validationRequest, userController.getById);

router.get("/", authorize, userController.getAll);

router.put("/:id", authorize, validationId, validationSave, validationRequest, userController.update);

router.delete("/:id", authorize, validationId, validationRequest, userController.remove);

module.exports = router;