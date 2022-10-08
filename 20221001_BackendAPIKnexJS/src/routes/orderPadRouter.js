const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationOrderPad } = require("../validations/orderPad/save");
const { validationId } = require("../validations/utils/id");
const { authorize } = require("../middlewares/authorize");
const orderPadController = require("../controllers/orderPadController");

router.get("/", authorize, orderPadController.getAll);

router.get("/:id", authorize, validationId, validationRequest, orderPadController.getById);

router.post("/", authorize, validationOrderPad, validationRequest, orderPadController.create);

router.put("/:id", authorize, validationId, validationOrderPad, validationRequest, orderPadController.update);

router.delete("/:id", authorize, validationId, validationRequest, orderPadController.remove);

module.exports = router;