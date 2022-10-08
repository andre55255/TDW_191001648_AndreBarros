const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationProduct } = require("../validations/product/save");
const { validationId } = require("../validations/utils/id");
const { authorize } = require("../middlewares/authorize");
const productController = require("../controllers/productController");

router.get("/", authorize, productController.getAll);

router.get("/:id", authorize, validationId, validationRequest, productController.getById);

router.post("/", authorize, validationProduct, validationRequest, productController.create);

router.put("/:id", authorize, validationId, validationProduct, validationRequest, productController.update);

router.delete("/:id", authorize, validationId, validationRequest, productController.remove);

module.exports = router;