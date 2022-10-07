const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationUnitOfMeasurement } = require("../validations/unitOfMeasurement/save");
const { validationId } = require("../validations/utils/id");
const unitOfMeasController = require("../controllers/unitOfMeasurementController");

router.get("/", unitOfMeasController.getAll);

router.get("/:id", validationId, validationRequest, unitOfMeasController.getById);

router.post("/", validationCategory, validationRequest, unitOfMeasController.create);

router.put("/:id", validationId, validationUnitOfMeasurement, validationRequest, unitOfMeasController.update);

router.delete("/:id", validationId, validationRequest, unitOfMeasController.remove);

module.exports = router;