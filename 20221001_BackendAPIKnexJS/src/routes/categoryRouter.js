const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationCategory } = require("../validations/category/save");
const { validationId } = require("../validations/utils/id");
const catController = require("../controllers/categoryController");

router.get("/", catController.getAll);

router.get("/:id", validationId, validationRequest, catController.getById);

router.post("/", validationCategory, validationRequest, catController.create);

router.put("/:id", validationId, validationCategory, validationRequest, catController.update);

router.delete("/:id", validationId, validationRequest, catController.remove);

module.exports = router;