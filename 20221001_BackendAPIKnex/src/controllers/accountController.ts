import { Request, Response } from "express";
import { buildApiResponse } from "../helpers/staticMethods";
import logger from "../middlewares/logger";
import { UserServiceImpl } from "../services/user/userServiceImpl";
import { UserServiceInterface } from "../services/user/userServiceInterface";
import { LoginVO } from "../viewObjects/user/LoginVO";

class AccountController {
    private _userService: UserServiceInterface;

    constructor() {
        this._userService = new UserServiceImpl();
    }

    public async login(req: Request, res: Response) {
        try {
            const loginVO = req.body as LoginVO;
            logger.info("Acessado rota /Account/Login, login " + loginVO.login);

            const resultLogin = await this._userService.login(loginVO);
            if (!resultLogin.success) {
                return res
                    .status(400)
                    .json(buildApiResponse(false, 400, resultLogin.message));
            }

            logger.info("Login efetuado com sucesso, login " + loginVO.login);
            return res
                .status(202)
                .json(
                    buildApiResponse(
                        true,
                        202,
                        "Login efetuado com sucesso",
                        resultLogin.object
                    )
                );
        } catch (err: any) {
            logger.error("AccountController login - Exceção: " + err);
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao realizar login"
                    )
                );
        }
    }
}

export const accountController = new AccountController();
