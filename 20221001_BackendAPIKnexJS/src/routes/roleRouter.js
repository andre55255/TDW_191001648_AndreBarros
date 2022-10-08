const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationRole } = require("../validations/role/save");
const { validationId } = require("../validations/utils/id");
const { authorize } = require("../middlewares/authorize");
const roleController = require("../controllers/roleController");

router.get("/", authorize, roleController.getAll);

router.get("/:id", authorize, validationId, validationRequest, roleController.getById);

router.post("/", authorize, validationRole, validationRequest, roleController.create);

router.put("/:id", authorize, validationId, validationRole, validationRequest, roleController.update);

router.delete("/:id", authorize, validationId, validationRequest, roleController.remove);

module.exports = router;