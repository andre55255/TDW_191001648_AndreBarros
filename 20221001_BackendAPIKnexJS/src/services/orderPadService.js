const orderPadRepo = require("../repositories/orderPadRepository");
const prodRepo = require("../repositories/productRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");
const moment = require("moment");

const createFull = async (model) => {
    try {
        const modelParsed = { date: model.date };
        modelParsed.items = rest.map((item) => {
            return {
                quantity: item.quantity,
                valueUnitary: item.valueUnitary,
                productId: item.productId,
            };
        });

        let resultValid = buildResult(true, "OK");
        modelParsed.items.forEach(async (item) => {
            const prodExist = await prodRepo.getById(item.productId);
            if (!prodExist) {
                resultValid = buildResult(
                    false,
                    `Produto não encontrado, 
                    id: ${item.productId}, 
                    quantidade: ${item.quantity}, 
                    valor unitário: ${item.valueUnitary}`
                );
                return resultValid;
            }
        });
        if (!resultValid || !resultValid.success) {
            logger.error("Falha: " + resultValid.message);
            return resultValid;
        }

        const modelOrderPad = {
            DataComanda: new Date(model.date),
        };
        const modelOrderPadItems = modelParsed.items.map((item) => {
            return {
                Quantidade: item.quantity,
                ValorUnitario: item.valueUnitary,
                IDProduto: item.productId,
            };
        });
        const resultCreated = await orderPadRepo.createOrderAndItems(
            modelOrderPad,
            modelOrderPadItems
        );
        if (!resultCreated.success) {
            logger.error(
                "orderPadService createFull - Falha ao criar comanda: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar comanda");
        }
        logger.info(
            "orderPadService createFull - Comanda criada com sucesso: " +
                description
        );

        const modelSave = await orderPadRepo.getById(resultCreated.object.id);
        return buildResult(true, "Comanda criada com sucesso", modelSave);
    } catch (err) {
        logger.error("orderPadService createFull - Exceção: " + err);
        return buildResult(false, "Falha ao criar comanda");
    }
};

const create = async (model) => {
    try {
        const { date } = model;
        
        const modelEntity = {
            DataComanda: moment(date).toDate()
        };
        const resultCreated = await orderPadRepo.create(modelEntity);
        if (!resultCreated.success) {
            logger.error(
                "orderPadService create - Falha ao criar comanda: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar comanda");
        }
        logger.info(
            "orderPadService create - Comanda criada com sucesso: " +
                resultCreated.object.id
        );

        const modelSave = await orderPadRepo.getById(resultCreated.object.id);
        return buildResult(true, "Comanda criada com sucesso", modelSave);
    } catch (err) {
        logger.error("orderPadService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar comanda");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await orderPadRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "orderPadService remove - Comanda não existe, id: " + id
            );
            return buildResult(false, "Comanda não encontrada");
        }

        const resultDeleted = await orderPadRepo.remove(id);
        if (!resultDeleted.success) {
            logger.error(
                "orderPadService remove - Falha ao deletar, id: " + id
            );
            return buildResult(false, resultDeleted.message);
        }
        logger.info(
            "orderPadService remove - Comanda deletada com sucesso, id: " + id
        );
        return buildResult(true, "Comanda deletada com sucesso");
    } catch (err) {
        logger.error("orderPadService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar comanda");
    }
};

const update = async (model) => {
    try {
        const { id, date } = model;

        const modelExist = await orderPadRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "orderPadService remove - Comanda não existe, id: " + id
            );
            return buildResult(false, "Comanda não encontrada");
        }

        const modelEntity = {
            IDComanda: id,
            DataComanda: new Date(date),
        };
        const result = await orderPadRepo.update(modelEntity, id);
        if (!result.success) {
            logger.error(
                "orderPadService update - Falha ao editar comanda: " +
                    result.message
            );
            return buildResult(false, "Falha ao editar comanda");
        }
        logger.error(
            "orderPadService update - Comanda editada com sucesso: " + id
        );

        const modelSave = await orderPadRepo.getById(result.object.id);
        return buildResult(true, "Comanda editada com sucesso", modelSave);
    } catch (err) {
        logger.error("orderPadService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar comanda");
    }
};

const getAll = async () => {
    try {
        const modelSaves = await orderPadRepo.getAll();
        if (!modelSaves) {
            return buildResult(false, "Não foi possível listar comandas");
        }
        return buildResult(true, "Comandas listadas com sucesso", modelSaves);
    } catch (err) {
        logger.error("orderPadService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar comandas");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await orderPadRepo.getById(id);
        if (!modelSave) {
            return buildResult(false, "Não foi possível listar comanda por id");
        }
        return buildResult(true, "Comanda listada com sucesso", modelSave);
    } catch (err) {
        logger.error("orderPadService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar comanda por id");
    }
};

module.exports = {
    createFull,
    remove,
    update,
    getAll,
    getById,
    create
};
