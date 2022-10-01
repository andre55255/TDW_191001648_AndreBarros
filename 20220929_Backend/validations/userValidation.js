const { buildResponse, validPasswordStrong } = require("../helpers/staticMethods");

const save = (req, res, next) => {
    try {
        const { login, name, password, roleId } = req.body;

        if (!login || login.length < 3 || login.length > 30) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Login(login) é obrigatório e deve ter entre 3 e 30 caracteres"
                    )
                );
        }
        if (!name || name.length < 3 || name.length > 45) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Nome(name) é obrigatório e deve ter entre 3 e 45 caracteres"
                    )
                );
        }
        if (!password || !validPasswordStrong(password)) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Senha(password) é obrigatória e deve ter entre 6 e 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
                    )
                );
        }
        req.body.status = "ATIVO";
        if (!roleId || isNaN(roleId) || roleId <= 0) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Id do Perfil(roleId) é obrigatório, ou foi informado de forma inválida"
                    )
                );
        }

        next();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(buildResponse(false, "Erro na validação: " + err.message));
    }
};

const id = (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id) || id <= 0) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Id não informado ou inválido nos parâmetros da requisição /int"
                    )
                );
        }

        next();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(buildResponse(false, "Erro na validação: " + err.message));
    }
};

module.exports = {
    save,
    id,
};
