const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const create = async (model) => {
    try {
        const resultInserted = await db.insert(model).into("TB_Produtos");

        if (!resultInserted) {
            logger.error("productRepository create - Erro ao inserir");
            buildResult(false, "productRepository create - Erro ao inserir");
        }

        return buildResult(true, "Produto criado", { id: resultInserted[0] });
    } catch (err) {
        logger.error("productRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar Produto na base de dados");
    }
};

const update = async (model, id) => {
    try {
        const resultUpdated = await db
            .update(model)
            .table("TB_Produtos")
            .where("TB_Produtos.IDProduto", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar Produto");
        }

        return buildResult(true, "Produto editada com sucesso");
    } catch (err) {
        logger.error("productRepository update - Exceção: " + err);
        return buildResult(false, "Falha ao editar Produto na base de dados");
    }
};

const remove = async (id) => {
    try {
        const resultDeleted = await db
            .select()
            .table("TB_Produtos")
            .where("TB_Produtos.IDProduto", id)
            .del();

        if (!resultDeleted) {
            return buildResult(false, "Falha ao deletar Produto");
        }

        return buildResult(true, "Produto deletado com sucesso");
    } catch (err) {
        logger.error("productRepository remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar Produto na base de dados");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await db
            .select([
                "TB_Produtos.IDProduto as id",
                "TB_Produtos.Descricao as description",
                "TB_Produtos.CodigoDeBarras as barCode",
                "TB_Produtos.Quantidade as quantity",
                "TB_Produtos.QuantidadeMinima as minQuantity",
                "TB_Produtos.ValorUnitario as valueUnitary",
                "TB_Categoria.IDCategoria as categoryId",
                "TB_Categoria.Descricao as categoryDescription",
                "TB_UnidadeMedida.IDUnidadeMedida as unitOfMeasurementId",
                "TB_UnidadeMedida.Descricao as unitOfMeasurementDescription",
            ])
            .table("TB_Produtos")
            .innerJoin(
                "TB_Categoria",
                "TB_Categoria.IDCategoria",
                "TB_Produtos.IDCategoria"
            )
            .innerJoin(
                "TB_UnidadeMedida",
                "TB_UnidadeMedida.IDUnidadeMedida",
                "TB_Produtos.IDUnidadeMedida"
            )
            .where("TB_Produtos.IDProduto", id);

        if (!modelSave) {
            return null;
        }

        const modelReturn = {
            id: modelSave[0].id,
            description: modelSave[0].description,
            barCode: modelSave[0].barCode,
            quantity: modelSave[0].quantity,
            minQuantity: modelSave[0].minQuantity,
            valueUnitary: modelSave[0].valueUnitary,
            category: {
                id: modelSave[0].categoryId,
                description: modelSave[0].categoryDescription,
            },
            unitOfMeasurement: {
                id: modelSave[0].unitOfMeasurementId,
                description: modelSave[0].unitOfMeasurementDescription,
            },
        };

        return modelReturn;
    } catch (err) {
        logger.error("productRepository getById - Exceção: " + err);
        return null;
    }
};

const getProductsByCategoryId = async (id) => {
    try {
        const modelSaves = await db
            .select([
                "TB_Produtos.IDProduto as id",
                "TB_Produtos.Descricao as description",
                "TB_Produtos.CodigoDeBarras as barCode",
                "TB_Produtos.Quantidade as quantity",
                "TB_Produtos.QuantidadeMinima as minQuantity",
                "TB_Produtos.ValorUnitario as valueUnitary",
                "TB_Categoria.IDCategoria as categoryId",
                "TB_Categoria.Descricao as categoryDescription",
                "TB_UnidadeMedida.IDUnidadeMedida as unitOfMeasurementId",
                "TB_UnidadeMedida.Descricao as unitOfMeasurementDescription",
            ])
            .table("TB_Produtos")
            .innerJoin(
                "TB_Categoria",
                "TB_Categoria.IDCategoria",
                "TB_Produtos.IDCategoria"
            )
            .innerJoin(
                "TB_UnidadeMedida",
                "TB_UnidadeMedida.IDUnidadeMedida",
                "TB_Produtos.IDUnidadeMedida"
            )
            .where("TB_Produtos.IDCategoria", id);

        if (!modelSaves) {
            return null;
        }

        const modelReturn = modelSaves.map((item) => {
            return {
                id: item.id,
                description: item.description,
                barCode: item.barCode,
                quantity: item.quantity,
                minQuantity: item.minQuantity,
                valueUnitary: item.valueUnitary,
                category: {
                    id: item.categoryId,
                    description: item.categoryDescription,
                },
                unitOfMeasurement: {
                    id: item.unitOfMeasurementId,
                    description: item.unitOfMeasurementDescription,
                },
            };
        });

        return modelReturn;
    } catch (err) {
        logger.error("productRepository getProductsByCategoryId - Exceção: " + err);
        return null;
    }
}

const getProductsByUnitOfMeasurementId = async (id) => {
    try {
        const modelSaves = await db
            .select([
                "TB_Produtos.IDProduto as id",
                "TB_Produtos.Descricao as description",
                "TB_Produtos.CodigoDeBarras as barCode",
                "TB_Produtos.Quantidade as quantity",
                "TB_Produtos.QuantidadeMinima as minQuantity",
                "TB_Produtos.ValorUnitario as valueUnitary",
                "TB_Categoria.IDCategoria as categoryId",
                "TB_Categoria.Descricao as categoryDescription",
                "TB_UnidadeMedida.IDUnidadeMedida as unitOfMeasurementId",
                "TB_UnidadeMedida.Descricao as unitOfMeasurementDescription",
            ])
            .table("TB_Produtos")
            .innerJoin(
                "TB_Categoria",
                "TB_Categoria.IDCategoria",
                "TB_Produtos.IDCategoria"
            )
            .innerJoin(
                "TB_UnidadeMedida",
                "TB_UnidadeMedida.IDUnidadeMedida",
                "TB_Produtos.IDUnidadeMedida"
            )
            .where("TB_Produtos.IDUnidadeMedida", id);

        if (!modelSaves) {
            return null;
        }

        const modelReturn = modelSaves.map((item) => {
            return {
                id: item.id,
                description: item.description,
                barCode: item.barCode,
                quantity: item.quantity,
                minQuantity: item.minQuantity,
                valueUnitary: item.valueUnitary,
                category: {
                    id: item.categoryId,
                    description: item.categoryDescription,
                },
                unitOfMeasurement: {
                    id: item.unitOfMeasurementId,
                    description: item.unitOfMeasurementDescription,
                },
            };
        });

        return modelReturn;
    } catch (err) {
        logger.error("productRepository getProductsByUnitOfMeasurementId - Exceção: " + err);
        return null;
    }
}

const updateQuantityProduct = async (id, quantity) => {
    try {
        const resultUpdated = await db
            .update({ Quantidade: quantity })
            .table("TB_Produtos")
            .where("TB_Produtos.IDProduto", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao atualizar quantiade de Produto");
        }

        return buildResult(true, "Produto atualizado com sucesso");
    } catch (err) {
        logger.error("productRepository updateQuantityProduct - Exceção: " + err);
        return buildResult(false, "Falha ao atualizar quantidade de Produto na base de dados");
    }
}

const getAll = async () => {
    try {
        const modelSaves = await db
            .select([
                "TB_Produtos.IDProduto as id",
                "TB_Produtos.Descricao as description",
                "TB_Produtos.CodigoDeBarras as barCode",
                "TB_Produtos.Quantidade as quantity",
                "TB_Produtos.QuantidadeMinima as minQuantity",
                "TB_Produtos.ValorUnitario as valueUnitary",
                "TB_Categoria.IDCategoria as categoryId",
                "TB_Categoria.Descricao as categoryDescription",
                "TB_UnidadeMedida.IDUnidadeMedida as unitOfMeasurementId",
                "TB_UnidadeMedida.Descricao as unitOfMeasurementDescription",
            ])
            .table("TB_Produtos")
            .innerJoin(
                "TB_Categoria",
                "TB_Categoria.IDCategoria",
                "TB_Produtos.IDCategoria"
            )
            .innerJoin(
                "TB_UnidadeMedida",
                "TB_UnidadeMedida.IDUnidadeMedida",
                "TB_Produtos.IDUnidadeMedida"
            )

        if (!modelSaves) {
            return null;
        }

        const modelReturn = modelSaves.map((item) => {
            return {
                id: item.id,
                description: item.description,
                barCode: item.barCode,
                quantity: item.quantity,
                minQuantity: item.minQuantity,
                valueUnitary: item.valueUnitary,
                category: {
                    id: item.categoryId,
                    description: item.categoryDescription,
                },
                unitOfMeasurement: {
                    id: item.unitOfMeasurementId,
                    description: item.unitOfMeasurementDescription,
                },
            };
        });

        return modelReturn;
    } catch (err) {
        logger.error("productRepository getAll - Exceção: " + err);
        return null;
    }
};

module.exports = {
    create,
    update,
    remove,
    getById,
    getProductsByCategoryId,
    getProductsByUnitOfMeasurementId,
    updateQuantityProduct,
    getAll,
};
