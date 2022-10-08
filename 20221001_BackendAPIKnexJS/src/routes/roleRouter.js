const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationRole } = require("../validations/role/save");
const { validationId } = require("../validations/utils/id");
const roleController = require("../controllers/roleController");

router.get("/", roleController.getAll);

router.get("/:id", validationId, validationRequest, roleController.getById);

router.post("/", validationRole, validationRequest, roleController.create);

router.put("/:id", validationId, validationRole, validationRequest, roleController.update);

router.delete("/:id", validationId, validationRequest, roleController.remove);

module.exports = router;