const accService = require("../services/accountService");
const userService = require("../services/userService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const login = async (req, res) => {
    try {
        logger.info("Acessado POST /account/login");
        const { login, password } = req.body;

        const resultLogin = await accService.login({ login, password });
        if (!resultLogin || !resultLogin.success) {
            return res
                .status(400)
                .json(
                    buildApiResponse(
                        false,
                        400,
                        resultLogin.message,
                        resultLogin.object
                    )
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Login efetuado com sucesso",
                    resultLogin.object
                )
            );
    } catch (err) {
        logger.error("accountController login - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao realizar login"));
    }
};

const userInfo = async (req, res) => {
    try {
        logger.info("Acessado POST /account/userInfo");
        const user = req.user;
        const result = await userService.getById(user.idUser);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(
                    buildApiResponse(
                        false,
                        400,
                        result.message,
                        result.object
                    )
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Informações de usuário listadas com sucesso",
                    result.object
                )
            );
    } catch (err) {
        logger.error("accountController userInfo - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao listar dados de usuário"));
    }
};

module.exports = {
    login,
    userInfo
};
