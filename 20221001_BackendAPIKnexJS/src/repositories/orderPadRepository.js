const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const create = async (model) => {
    try {
        const resultInserted = await db.insert(model).into("TB_Comanda");

        if (!resultInserted) {
            logger.error("OrderRepository create - Erro ao inserir");
            buildResult(false, "OrderRepository create - Erro ao inserir");
        }

        return buildResult(true, "Comanda criada", { id: resultInserted[0] });
    } catch (err) {
        logger.error("OrderRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar Comanda na base de dados");
    }
};

const createOrderAndItems = async (order, items) => {
    const trans = db.transaction();
    try {
        const orderId = await trans.insert(order).into("TB_Comanda");
        const itemsWithIdOrder = items.map((item) => {
            return {
                IDComanda: orderId[0],
                ...item,
            };
        });
        await trans.insert(itemsWithIdOrder);
        await trans.commit();
    } catch (err) {
        await trans.rollback();
        logger.error("OrderRepository createOrderAndItems - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao criar Comanda com itens na base de dados"
        );
    }
};

const update = async (model, id) => {
    try {
        const resultUpdated = await db
            .update(model)
            .table("TB_Comanda")
            .where("TB_Comanda.IDComanda", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar Comanda");
        }

        return buildResult(true, "Comanda editada com sucesso");
    } catch (err) {
        logger.error("OrderRepository update - Exceção: " + err);
        return buildResult(false, "Falha ao editar Comanda na base de dados");
    }
};

const remove = async (id) => {
    const trans = await db.transaction();
    try {
        const delItems = await trans
            .select("*")
            .table("TB_Item_Comanda")
            .where("TB_Item_Comanda.IDComanda", id)
            .del();

        if (!delItems) {
            trans.rollback();
            logger.error(
                "OrderRepository remove - Falha ao remover itens de comanda no banco"
            );
            return buildResult(
                false,
                "OrderRepository remove - Falha ao remover itens de comanda no banco"
            );
        }

        const delOrder = await trans
            .select("*")
            .table("TB_Comanda")
            .where("TB_Comanda.IDComanda", id)
            .del();

        if (!delOrder) {
            trans.rollback();
            logger.error(
                "OrderRepository remove - Falha ao remover comanda no banco"
            );
            return buildResult(
                false,
                "OrderRepository remove - Falha ao remover comanda no banco"
            );
        }

        await trans.commit();
    } catch (err) {
        await trans.rollback();
        logger.error("OrderRepository remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar Comanda na base de dados");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await db
            .from("orderPadFull")
            .select("*")
            .where("orderPadFull.idComanda", id);

        if (!modelSave) {
            return null;
        }

        const modelReturn = {
            id: modelSave[0].IDComanda,
            date: modelSave[0].dateComanda,
        };
        const items = modelSave.map((item) => {
            return {
                id: item.idItem,
                quantity: item.quantidadeItem,
                valueUnitary: item.valorUnitarioItem,
                product: {
                    id: item.idProduto,
                    description: item.descricaoProduto,
                    barCode: item.codigoBarrasProduto,
                    quantity: item.quantidadeProduto,
                    minQuantity: item.quantidadeMinimaProduto,
                    valueUnitary: item.valorUnitarioProduto,
                    category: {
                        id: item.idCategoria,
                        description: item.descricaoCategoria,
                    },
                    unitOfMeasurement: {
                        id: item.idUnidadeMedida,
                        description: item.descricaoUnidadeMedida,
                    },
                },
            };
        });
        modelReturn.items = items;

        return modelReturn;
    } catch (err) {
        logger.error("OrderRepository getById - Exceção: " + err);
        return null;
    }
};

const getAll = async () => {
    try {
        const modelSaves = await db.from("orderPadFull").select("*");

        if (!modelSaves) {
            return null;
        }

        const orderPads = [];
        modelSaves.forEach((item, index, array) => {
            const orderPadsExist = orderPads.filter(
                (order) => order.id == item.idComanda
            );

            if (!orderPadsExist || !orderPadsExist.length) {
                const aux = {
                    id: item.idComanda,
                    date: item.dateComanda,
                };
                const items = array
                    .filter((i) => i.idComanda == item.idComanda)
                    .map((el) => {
                        return {
                            id: el.idItem,
                            quantity: el.quantidadeItem,
                            valueUnitary: el.valorUnitarioItem,
                            product: {
                                id: el.idProduto,
                                description: el.descricaoProduto,
                                barCode: el.codigoBarrasProduto,
                                quantity: el.quantidadeProduto,
                                minQuantity: el.quantidadeMinimaProduto,
                                valueUnitary: el.valorUnitarioProduto,
                                category: {
                                    id: el.idCategoria,
                                    description: el.descricaoCategoria,
                                },
                                unitOfMeasurement: {
                                    id: el.idUnidadeMedida,
                                    description: el.descricaoUnidadeMedida,
                                },
                            },
                        };
                    });
                aux.items = items;
                orderPads.push(aux);
            }
        });

        return orderPads;
    } catch (err) {
        logger.error("OrderRepository getAll - Exceção: " + err);
        return null;
    }
};

module.exports = {
    create,
    createOrderAndItems,
    update,
    remove,
    getById,
    getAll,
};
