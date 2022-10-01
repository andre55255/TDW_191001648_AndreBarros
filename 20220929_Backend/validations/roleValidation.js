const { buildResponse } = require("../helpers/staticMethods");

const save = (req, res, next) => {
    try {
        const { description } = req.body;

        if (!description || description.length > 30) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Descrição(description) é obrigatória e deve ter no máximo 30 caracteres"
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