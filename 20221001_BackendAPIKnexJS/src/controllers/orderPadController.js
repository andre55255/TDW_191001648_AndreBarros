const orderPad = require("../services/orderPadService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /orderPad");
        const model = req.body;

        const result = await orderPad.create(model);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(
                    buildApiResponse(false, 400, result.message, result.object)
                );
        }
        return res
            .status(201)
            .json(buildApiResponse(true, 201, result.message, result.object));
    } catch (err) {
        logger.error("orderPadController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar comanda"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /orderPad/:id");
        const { id } = req.params;

        const modelSave = await orderPad.getById(id);
        if (!modelSave || !modelSave.success) {
            logger.error(
                "orderPadController getById - comanda não encontrada: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "comanda não encontrada"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "comanda listado com sucesso",
                    modelSave.object
                )
            );
    } catch (err) {
        logger.error(
            "orderPadController getById - Falha ao listar comanda por id"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar comanda por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /orderPad");
        const modelsSaves = await orderPad.getAll();
        if (!modelsSaves) {
            logger.error(
                "orderPadController getAll - itens de comanda não encontrados"
            );
            return res
                .status(404)
                .json(
                    buildApiResponse(false, 404, "Itens de comanda não encontrados")
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "itens de comanda listados com sucesso",
                    modelsSaves.object
                )
            );
    } catch (err) {
        logger.error(
            "orderPadController getAll - Falha ao listar todas os itens de comanda"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar todas os itens de comanda")
            );
    }
};

const update = async (req, res) => {
    try {
        logger.info("Acessado PUT /orderPad/:id");
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;

        const result = await orderPad.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("orderPadController update - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao editar comanda"));
    }
};

const remove = async (req, res) => {
    try {
        logger.info("Acessado DELETE /orderPad/:id");
        const { id } = req.params;
        const result = await orderPad.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "Comanda deletada com sucesso"));
    } catch (err) {
        logger.error("orderPadController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover comanda"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
}