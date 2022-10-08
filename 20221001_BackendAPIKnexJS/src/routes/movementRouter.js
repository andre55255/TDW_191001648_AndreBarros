const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationMovement } = require("../validations/movement/save");
const { validationId } = require("../validations/utils/id");
const { authorize } = require("../middlewares/authorize");
const movementController = require("../controllers/movementController");

router.get("/", authorize, movementController.getAll);

router.get("/:id", authorize, validationId, validationRequest, movementController.getById);

router.post("/", authorize, validationMovement, validationRequest, movementController.create);

router.put("/:id", authorize, validationId, validationMovement, validationRequest, movementController.update);

router.delete("/:id", authorize, validationId, validationRequest, movementController.remove);

module.exports = router;