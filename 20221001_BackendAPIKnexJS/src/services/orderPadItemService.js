const prodRepo = require("../repositories/productRepository");
const orderPad = require("../repositories/orderPadRepository");
const orderPadItem = require("../repositories/orderPadItemRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (model) => {
    try {
        const { quantity, valueUnitary, orderPadId, productId } = model;

        const orderPadExist = await orderPad.getById(orderPadId);
        if (!orderPadExist) {
            logger.error(
                "orderPadItemService create - Comanda não encontrada para vincular, id: " +
                    orderPadId
            );
            return buildResult(false, "Comanda não encontrada para vincular");
        }

        const productExist = await prodRepo.getById(productId);
        if (!productExist) {
            logger.error(
                "orderPadItemService create - Produto não encontrado para vincular, id: " +
                    productId
            );
            return buildResult(false, "Produto não encontrado para vincular");
        }

        const modelEntity = {
            Quantidade: quantity,
            ValorUnitario: valueUnitary,
            IDComanda: orderPadId,
            IDProduto: productId
        };
        const resultCreated = await orderPadItem.create(modelEntity);
        if (!resultCreated.success) {
            logger.error(
                "orderPadItemService create - Falha ao criar item de comanda: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar item de comanda");
        }
        logger.error(
            "orderPadItemService create - Item de comanda criado com sucesso: " +
                resultCreated.object.id
        );

        const modelSave = await orderPadItem.getById(resultCreated.object.id);
        return buildResult(true, "Item de comanda criado com sucesso", modelSave);
    } catch (err) {
        logger.error("orderPadItemService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar item de comanda");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await orderPadItem.getById(id);
        if (!modelExist) {
            logger.error(
                "orderPadItemService remove - Item de comanda não existe, id: " + id
            );
            return buildResult(false, "Item de comanda não encontrado");
        }

        const resultDeleted = await orderPadItem.remove(id);
        if (!resultDeleted.success) {
            logger.error(
                "orderPadItemService remove - Falha ao deletar, id: " + id
            );
            return buildResult(false, "Falha ao deletar item de comanda");
        }
        logger.info(
            "orderPadItemService remove - Item de comanda deletado com sucesso, id: " + id
        );
        return buildResult(true, "Item de comanda deletado com sucesso");
    } catch (err) {
        logger.error("orderPadItemService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar item de comanda");
    }
};

const update = async (model) => {
    try {
        const { id, quantity, valueUnitary, orderPadId, productId } = model;

        const modelExist = await orderPadItem.getById(id);
        if (!modelExist) {
            logger.error(
                "orderPadItemService update - Item de comanda não existe, id: " + id
            );
            return buildResult(false, "Item de comanda não encontrado");
        }

        const orderPadExist = await orderPad.getById(orderPadId);
        if (!orderPadExist) {
            logger.error(
                "orderPadItemService update - Comanda não encontrada para vincular, id: " +
                    orderPadId
            );
            return buildResult(false, "Comanda não encontrada para vincular");
        }

        const productExist = await prodRepo.getById(productId);
        if (!productExist) {
            logger.error(
                "orderPadItemService update - Produto não encontrado para vincular, id: " +
                    productId
            );
            return buildResult(false, "Produto não encontrado para vincular");
        }

        const modelEntity = {
            IDItemComanda: id,
            Quantidade: quantity,
            ValorUnitario: valueUnitary,
            IDComanda: orderPadId,
            IDProduto: productId
        };
        const result = await orderPadItem.update(modelEntity, id);
        if (!result.success) {
            logger.error(
                "orderPadItemService update - Falha ao editar item de comanda: " +
                    result.message
            );
            return buildResult(false, "Falha ao editar item de comanda");
        }
        logger.error(
            "orderPadItemService update - Item de comanda editado com sucesso: " +
                id
        );

        const modelSave = await orderPadItem.getById(result.object.id);
        return buildResult(true, "Item de comanda editado com sucesso", modelSave);
    } catch (err) {
        logger.error("orderPadItemService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar item de comanda");
    }
};

const getAll = async () => {
    try {
        const modelSaves = await orderPadItem.getAll();
        if (!modelSaves) {
            return buildResult(false, "Não foi possível listar itens de comanda");
        }
        return buildResult(true, "Itens de comanda listados com sucesso", modelSaves);
    } catch (err) {
        logger.error("orderPadItemService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar itens de comanda");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await orderPadItem.getById(id);
        if (!modelSave) {
            return buildResult(
                false,
                "Não foi possível listar item de comanda por id"
            );
        }
        return buildResult(true, "Item de comanda listado com sucesso", modelSave);
    } catch (err) {
        logger.error("orderPadItemService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar item de comanda por id");
    }
};

module.exports = {
    create,
    remove,
    update,
    getAll,
    getById,
};
