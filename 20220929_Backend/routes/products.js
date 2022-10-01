const router = require("express").Router();
const productController = require("../controllers/productController");
const productValidations = require("../validations/productValidation");

router.get("/", productController.getAll);

router.get("/:id", productValidations.id, productController.getById);

router.post("/", productValidations.save, productController.create);

router.put("/:id", productValidations.id, productValidations.save, productController.edit);

router.delete("/:id", productValidations.id, productController.remove);

module.exports = router;