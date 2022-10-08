const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationCategory } = require("../validations/category/save");
const { validationId } = require("../validations/utils/id");
const { authorize } = require("../middlewares/authorize");
const catController = require("../controllers/categoryController");

router.get("/", authorize, catController.getAll);

router.get("/:id", authorize, validationId, validationRequest, catController.getById);

router.post("/", authorize, validationCategory, validationRequest, catController.create);

router.put("/:id", authorize, validationId, validationCategory, validationRequest, catController.update);

router.delete("/:id", authorize, validationId, validationRequest, catController.remove);

module.exports = router;