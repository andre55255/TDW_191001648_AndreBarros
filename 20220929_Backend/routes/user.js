const router = require("express").Router();
const userValidation = require("../validations/userValidation");
const userController = require("../controllers/userController");

router.get("/", userController.getAll);

router.get("/:id", userValidation.id, userController.getById);

router.post("/", userValidation.save, userController.create);

router.put("/:id", userValidation.id, userValidation.save, userController.edit);

router.delete("/:id", userValidation.id, userController.remove);

module.exports = router;