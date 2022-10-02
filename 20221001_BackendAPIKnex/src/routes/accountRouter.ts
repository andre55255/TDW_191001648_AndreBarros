import { Router } from "express";
import { accountController } from "../controllers/accountController";
import { validationRequest } from "../middlewares/validation";
import { validationLogin } from "../validations/login";

const router: Router = Router();

router.post("/Login", validationLogin, validationRequest, accountController.login);

export default router;