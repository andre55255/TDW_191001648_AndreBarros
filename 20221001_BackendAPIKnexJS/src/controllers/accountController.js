const accService = require("../services/accountService");
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

module.exports = {
    login,
};
