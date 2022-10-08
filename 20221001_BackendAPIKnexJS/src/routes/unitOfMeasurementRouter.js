const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationUnitOfMeasurement } = require("../validations/unitOfMeasurement/save");
const { validationId } = require("../validations/utils/id");
const { authorize } = require("../middlewares/authorize");
const unitOfMeasController = require("../controllers/unitOfMeasurementController");

router.get("/", authorize, unitOfMeasController.getAll);

router.get("/:id", authorize, validationId, validationRequest, unitOfMeasController.getById);

router.post("/", authorize, validationUnitOfMeasurement, validationRequest, unitOfMeasController.create);

router.put("/:id", authorize, validationId, validationUnitOfMeasurement, validationRequest, unitOfMeasController.update);

router.delete("/:id", authorize, validationId, validationRequest, unitOfMeasController.remove);

module.exports = router;