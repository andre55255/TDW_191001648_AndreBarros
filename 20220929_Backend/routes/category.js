const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const validationsCategory = require("../validations/categoryValidation");

router.get("/", categoryController.getAll);

router.get("/:id", validationsCategory.id, categoryController.getById);

router.post("/", validationsCategory.save, categoryController.create);

router.put("/:id", validationsCategory.id, validationsCategory.save, categoryController.edit);

router.delete("/:id", validationsCategory.id, categoryController.remove);

module.exports = router;