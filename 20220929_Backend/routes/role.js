const router = require("express").Router();
const roleValidation = require("../validations/roleValidation");
const roleController = require("../controllers/roleController");

router.get("/", roleController.getAll);

router.get("/:id", roleValidation.id, roleController.getById);

router.post("/", roleValidation.save, roleController.create);

router.put("/:id", roleValidation.id, roleValidation.save, roleController.edit);

router.delete("/:id", roleValidation.id, roleController.remove);

module.exports = router;