const orderPadItem = require("../services/orderPadItemService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /orderPadItem");
        const model = req.body;

        const result = await orderPadItem.create(model);
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
        logger.error("orderPadItemController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar item de comanda"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /orderPadItem/:id");
        const { id } = req.params;

        const modelSave = await orderPadItem.getById(id);
        if (!modelSave || !modelSave.success) {
            logger.error(
                "orderPadItemController getById - item de comanda não encontrada: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Item de comanda não encontrada"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Item de comanda listado com sucesso",
                    modelSave.object
                )
            );
    } catch (err) {
        logger.error(
            "orderPadItemController getById - Falha ao listar item de comanda por id"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar item de comanda por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /orderPadItem");
        const modelsSaves = await orderPadItem.getAll();
        if (!modelsSaves) {
            logger.error(
                "orderPadItemController getAll - itens de comanda não encontrados"
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
            "orderPadItemController getAll - Falha ao listar todas os itens de comanda"
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
        logger.info("Acessado PUT /orderPadItem/:id");
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;

        const result = await orderPadItem.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("orderPadItemController update - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao editar item de comanda"));
    }
};

const remove = async (req, res) => {
    try {
        logger.info("Acessado DELETE /orderPadItem/:id");
        const { id } = req.params;
        const result = await orderPadItem.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "item de comanda deletado com sucesso"));
    } catch (err) {
        logger.error("orderPadItemController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover item de comanda"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
}