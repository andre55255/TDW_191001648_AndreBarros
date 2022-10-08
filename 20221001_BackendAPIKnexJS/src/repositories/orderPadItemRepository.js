const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const create = async (model) => {
    try {
        const resultInserted = await db.insert(model).into("TB_Item_Comanda");

        if (!resultInserted) {
            logger.error("orderPadItemRepository create - Erro ao inserir");
            buildResult(
                false,
                "orderPadItemRepository create - Erro ao inserir"
            );
        }

        return buildResult(true, "Item de comanda criado", {
            id: resultInserted[0],
        });
    } catch (err) {
        logger.error("orderPadItemRepository create - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao criar Item de comanda na base de dados"
        );
    }
};

const update = async (model, id) => {
    try {
        const resultUpdated = await db
            .update(model)
            .table("TB_Item_Comanda")
            .where("TB_Item_Comanda.IDItemComanda", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar Item de comanda");
        }

        return buildResult(true, "Item de comanda editado com sucesso");
    } catch (err) {
        logger.error("orderPadItemRepository update - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao editar Item de comanda na base de dados"
        );
    }
};

const remove = async (id) => {
    try {
        const resultDeleted = await db
            .select()
            .table("TB_Item_Comanda")
            .where("TB_Item_Comanda.IDItemComanda", id)
            .del();

        if (!resultDeleted) {
            return buildResult(false, "Falha ao deletar Item de comanda");
        }

        return buildResult(true, "Item de comanda deletado com sucesso");
    } catch (err) {
        logger.error("orderPadItemRepository remove - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao deletar Item de comanda na base de dados"
        );
    }
};

const getById = async (id) => {
    try {
        const modelSave = await db
            .select([
                "TB_Item_Comanda.IDItemComanda as id",
                "TB_Item_Comanda.Quantidade as quantity",
                "TB_Item_Comanda.ValorUnitario as valueUnitary",
                "TB_Comanda.IDComanda as orderPadId",
                "TB_Comanda.DataComanda as orderPadDate",
                "TB_Produtos.IDProduto as productId",
                "TB_Produtos.Descricao as productDescription",
                "TB_Produtos.CodigoDeBarras as productBarCode",
                "TB_Produtos.Quantidade as productQuantity",
                "TB_Produtos.QuantidadeMinima as productMinQuantity",
                "TB_Produtos.ValorUnitario as productValueUnitary",
                "TB_UnidadeMedida.IDUnidadeMedida as unitOfMeasurementId",
                "TB_UnidadeMedida.Descricao as unitOfMeasurementDescription",
                "TB_Categoria.IDCategoria as categoryId",
                "TB_Categoria.Descricao as categoryDescription",
            ])
            .table("TB_Item_Comanda")
            .innerJoin(
                "TB_Comanda",
                "TB_Comanda.IDComanda",
                "TB_Item_Comanda.IDComanda"
            )
            .innerJoin(
                "TB_Produtos",
                "TB_Produtos.IDProduto",
                "TB_Item_Comanda.IDProduto"
            )
            .innerJoin(
                "TB_UnidadeMedida",
                "TB_UnidadeMedida.IDUnidadeMedida",
                "TB_Produtos.IDUnidadeMedida"
            )
            .innerJoin(
                "TB_Categoria",
                "TB_Categoria.IDCategoria",
                "TB_Produtos.IDCategoria"
            )
            .where("TB_Item_Comanda.IDItemComanda", id);

        if (!modelSave) {
            return null;
        }

        const modelReturn = {
            id: modelSave[0].id,
            quantity: modelSave[0].quantity,
            valueUnitary: modelSave[0].valueUnitary,
            orderPad: {
                id: modelSave[0].orderPadId,
                date: modelSave[0].orderPadDate,
            },
            product: {
                id: modelSave[0].productId,
                description: modelSave[0].productDescription,
                barCode: modelSave[0].productBarCode,
                quantity: modelSave[0].productQuantity,
                minQuantity: modelSave[0].productMinQuantity,
                valueUnitary: modelSave[0].productValueUnitary,
            },
            unitOfMeasurement: {
                id: modelSave[0].unitOfMeasurementId,
                description: modelSave[0].unitOfMeasurementDescription,
            },
            category: {
                id: modelSave[0].categoryId,
                description: modelSave[0].categoryDescription,
            },
        };

        return modelReturn;
    } catch (err) {
        logger.error("orderPadItemRepository getById - Exceção: " + err);
        return null;
    }
};

const getAll = async () => {
    try {
        const modelSaves = await db
            .select([
                "TB_Item_Comanda.IDItemComanda as id",
                "TB_Item_Comanda.Quantidade as quantity",
                "TB_Item_Comanda.ValorUnitario as valueUnitary",
                "TB_Comanda.IDComanda as orderPadId",
                "TB_Comanda.DataComanda as orderPadDate",
                "TB_Produtos.IDProduto as productId",
                "TB_Produtos.Descricao as productDescription",
                "TB_Produtos.CodigoDeBarras as productBarCode",
                "TB_Produtos.Quantidade as productQuantity",
                "TB_Produtos.QuantidadeMinima as productMinQuantity",
                "TB_Produtos.ValorUnitario as productValueUnitary",
                "TB_UnidadeMedida.IDUnidadeMedida as unitOfMeasurementId",
                "TB_UnidadeMedida.Descricao as unitOfMeasurementDescription",
                "TB_Categoria.IDCategoria as categoryId",
                "TB_Categoria.Descricao as categoryDescription",
            ])
            .table("TB_Item_Comanda")
            .innerJoin(
                "TB_Comanda",
                "TB_Comanda.IDComanda",
                "TB_Item_Comanda.IDComanda"
            )
            .innerJoin(
                "TB_Produtos",
                "TB_Produtos.IDProduto",
                "TB_Item_Comanda.IDProduto"
            )
            .innerJoin(
                "TB_UnidadeMedida",
                "TB_UnidadeMedida.IDUnidadeMedida",
                "TB_Produtos.IDUnidadeMedida"
            )
            .innerJoin(
                "TB_Categoria",
                "TB_Categoria.IDCategoria",
                "TB_Produtos.IDCategoria"
            );

        if (!modelSaves) {
            return null;
        }

        const modelReturn = modelSaves.map((item) => {
            return {
                id: item.id,
                quantity: item.quantity,
                valueUnitary: item.valueUnitary,
                orderPad: {
                    id: item.orderPadId,
                    date: item.orderPadDate,
                },
                product: {
                    id: item.productId,
                    description: item.productDescription,
                    barCode: item.productBarCode,
                    quantity: item.productQuantity,
                    minQuantity: item.productMinQuantity,
                    valueUnitary: item.productValueUnitary,
                },
                unitOfMeasurement: {
                    id: item.unitOfMeasurementId,
                    description: item.unitOfMeasurementDescription,
                },
                category: {
                    id: item.categoryId,
                    description: item.categoryDescription,
                },
            };
        });

        return modelReturn;
    } catch (err) {
        logger.error("orderPadItemRepository getAll - Exceção: " + err);
        return null;
    }
};

const getAllByProductId = async (id) => {
    try {
        const modelSaves = await db
            .select([
                "TB_Item_Comanda.IDItemComanda as id",
                "TB_Item_Comanda.Quantidade as quantity",
                "TB_Item_Comanda.ValorUnitario as valueUnitary",
                "TB_Comanda.IDComanda as orderPadId",
                "TB_Comanda.DataComanda as orderPadDate",
                "TB_Produtos.IDProduto as productId",
                "TB_Produtos.Descricao as productDescription",
                "TB_Produtos.CodigoDeBarras as productBarCode",
                "TB_Produtos.Quantidade as productQuantity",
                "TB_Produtos.QuantidadeMinima as productMinQuantity",
                "TB_Produtos.ValorUnitario as productValueUnitary",
                "TB_UnidadeMedida.IDUnidadeMedida as unitOfMeasurementId",
                "TB_UnidadeMedida.Descricao as unitOfMeasurementDescription",
                "TB_Categoria.IDCategoria as categoryId",
                "TB_Categoria.Descricao as categoryDescription",
            ])
            .table("TB_Item_Comanda")
            .innerJoin(
                "TB_Comanda",
                "TB_Comanda.IDComanda",
                "TB_Item_Comanda.IDComanda"
            )
            .innerJoin(
                "TB_Produtos",
                "TB_Produtos.IDProduto",
                "TB_Item_Comanda.IDProduto"
            )
            .innerJoin(
                "TB_UnidadeMedida",
                "TB_UnidadeMedida.IDUnidadeMedida",
                "TB_Produtos.IDUnidadeMedida"
            )
            .innerJoin(
                "TB_Categoria",
                "TB_Categoria.IDCategoria",
                "TB_Produtos.IDCategoria"
            )
            .where("TB_Item_Comanda.IDProduto", id);

        if (!modelSaves) {
            return null;
        }

        const modelReturn = modelSaves.map((item) => {
            return {
                id: item.id,
                quantity: item.quantity,
                valueUnitary: item.valueUnitary,
                orderPad: {
                    id: item.orderPadId,
                    date: item.orderPadDate,
                },
                product: {
                    id: item.productId,
                    description: item.productDescription,
                    barCode: item.productBarCode,
                    quantity: item.productQuantity,
                    minQuantity: item.productMinQuantity,
                    valueUnitary: item.productValueUnitary,
                },
                unitOfMeasurement: {
                    id: item.unitOfMeasurementId,
                    description: item.unitOfMeasurementDescription,
                },
                category: {
                    id: item.categoryId,
                    description: item.categoryDescription,
                },
            };
        });

        return modelReturn;
    } catch (err) {
        logger.error("orderPadItemRepository getAll - Exceção: " + err);
        return null;
    }
};

module.exports = {
    create,
    update,
    remove,
    getById,
    getAll,
    getAllByProductId,
};
