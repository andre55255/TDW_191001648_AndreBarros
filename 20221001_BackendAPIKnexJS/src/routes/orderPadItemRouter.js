const router = require("express").Router();
const { validationRequest } = require("../middlewares/validationRequest");
const { validationOrderPadItem } = require("../validations/orderPadItem/save");
const { validationId } = require("../validations/utils/id");
const { authorize } = require("../middlewares/authorize");
const orderPadItemController = require("../controllers/orderPadItemController");

router.get("/", authorize, orderPadItemController.getAll);

router.get("/:id", authorize, validationId, validationRequest, orderPadItemController.getById);

router.post("/", authorize, validationOrderPadItem, validationRequest, orderPadItemController.create);

router.put("/:id", authorize, validationId, validationOrderPadItem, validationRequest, orderPadItemController.update);

router.delete("/:id", authorize, validationId, validationRequest, orderPadItemController.remove);

module.exports = router;