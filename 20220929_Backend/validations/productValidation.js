const { buildResponse } = require("../helpers/staticMethods");

const save = (req, res, next) => {
    try {
        const { description, categoryId, barCode, quantity, minQuantity, valueUnitary } =
            req.body;

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
        if (!categoryId || isNaN(categoryId) || categoryId <= 0) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Id da Categoria(categoryId) é obrigatória e deve ser maior que zero"
                    )
                );
        }
        if (!barCode || barCode.length > 40) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Código de barras(barCode) é obrigatório e deve ter no máximo 40 caracteres"
                    )
                );
        }
        if (!quantity) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Quantidade(quantity) é obrigatória"
                    )
                );
        }
        if (!minQuantity) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Quantidade mínima permitida em estoque(minQuantity) é obrigatória"
                    )
                );
        }
        if (!valueUnitary) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Valor unitário(valueUnitary) é obrigatório"
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
            .json(buildResponse(false, "Id não informado ou inválido nos parâmetros da requisição /int"));
        }

        next();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(buildResponse(false, "Erro na validação: " + err.message));
    }
}

module.exports = {
    save,
    id
}