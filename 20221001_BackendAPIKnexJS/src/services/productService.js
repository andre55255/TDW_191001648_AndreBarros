const catRepo = require("../repositories/categoryRepository");
const unitRepo = require("../repositories/unitOfMeasurementRepository");
const prodRepo = require("../repositories/productRepository");
const orderItemRepo = require("../repositories/orderPadItemRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (model) => {
    try {
        const {
            description,
            barCode,
            quantity,
            minQuantity,
            valueUnitary,
            idUnitOfMeasurement,
            idCategory,
        } = model;

        const categoryExist = await catRepo.getById(idCategory);
        if (!categoryExist) {
            logger.error(
                "productService - Categoria não encontrada para vincular, id: " +
                    idCategory
            );
            return buildResult(false, "Categoria não encontrada para vincular");
        }

        const unitOfMeasExist = await unitRepo.getById(idUnitOfMeasurement);
        if (!unitOfMeasExist) {
            logger.error(
                "productService - Unidade de medida não encontrada para vincular, id: " +
                    idUnitOfMeasurement
            );
            return buildResult(
                false,
                "Unidade de medida não encontrada para vincular"
            );
        }

        const modelEntity = {
            Descricao: description,
            IDUnidadeMedida: idUnitOfMeasurement,
            IDCategoria: idCategory,
            CodigoDeBarras: barCode,
            Quantidade: quantity,
            QuantidadeMinima: minQuantity,
            ValorUnitario: valueUnitary,
        };
        const resultCreated = await prodRepo.create(modelEntity);
        if (!resultCreated.success) {
            logger.error(
                "productService create - Falha ao criar Produto: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar Produto");
        }
        logger.info(
            "productService create - Produto criado com sucesso: " + description
        );

        const modelSave = await prodRepo.getById(resultCreated.object.id);
        return buildResult(true, "Produto criado com sucesso", modelSave);
    } catch (err) {
        logger.error("productService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar Produto");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await prodRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "productService remove - Produto não existe, id: " + id
            );
            return buildResult(false, "Produto não encontrado");
        }

        const orderPadWithProduct = await orderItemRepo.getAllByProductId(id);
        if (orderPadWithProduct && orderPadWithProduct.length) {
            logger.error(
                "productService remove - Produto possui vinculo com um ou mais itens de comanda, id: " +
                    id
            );
            return buildResult(
                false,
                `Produto possui vinculo com ${orderPadWithProduct.length} itens de comanda`
            );
        }

        const resultDeleted = await prodRepo.remove(id);
        if (!resultDeleted.success) {
            logger.error("productService remove - Falha ao deletar, id: " + id);
            return buildResult(false, "Falha ao deletar Produto");
        }
        logger.info(
            "productService remove - Produto deletado com sucesso, id: " + id
        );
        return buildResult(true, "Produto deletado com sucesso");
    } catch (err) {
        logger.error("productService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar Produto");
    }
};

const update = async (model) => {
    try {
        const {
            id,
            description,
            barCode,
            quantity,
            minQuantity,
            valueUnitary,
            idUnitOfMeasurement,
            idCategory,
        } = model;

        const productExist = await prodRepo.getById(id);
        if (!productExist) {
            logger.error("productService - Produto não encontrado, id: " + id);
            return buildResult(false, "Produto não encontrado");
        }

        const categoryExist = await catRepo.getById(idCategory);
        if (!categoryExist) {
            logger.error(
                "productService - Categoria não encontrada para vincular, id: " +
                    idCategory
            );
            return buildResult(false, "Categoria não encontrada para vincular");
        }

        const unitOfMeasExist = await unitRepo.getById(idUnitOfMeasurement);
        if (!unitOfMeasExist) {
            logger.error(
                "productService - Unidade de medida não encontrada para vincular, id: " +
                    idUnitOfMeasurement
            );
            return buildResult(
                false,
                "Unidade de medida não encontrada para vincular"
            );
        }

        const modelEntity = {
            IDProduto: id,
            Descricao: description,
            IDUnidadeMedida: idUnitOfMeasurement,
            IDCategoria: idCategory,
            CodigoDeBarras: barCode,
            Quantidade: quantity,
            QuantidadeMinima: minQuantity,
            ValorUnitario: valueUnitary,
        };
        const result = await prodRepo.update(modelEntity, id);
        if (!result.success) {
            logger.error(
                "productService update - Falha ao editar Produto: " +
                    result.message
            );
            return buildResult(false, "Falha ao editar Produto");
        }
        logger.info(
            "productService update - Produto editado com sucesso: " +
                description
        );

        const modelSave = await prodRepo.getById(id);
        return buildResult(true, "Produto editado com sucesso", modelSave);
    } catch (err) {
        logger.error("productService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar Produto");
    }
};

const getAll = async () => {
    try {
        const modelSaves = await prodRepo.getAll();
        if (!modelSaves) {
            return buildResult(false, "Não foi possível listar Produtos");
        }
        return buildResult(true, "Produtos listados com sucesso", modelSaves);
    } catch (err) {
        logger.error("productService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar Produtos");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await prodRepo.getById(id);
        if (!modelSave) {
            return buildResult(false, "Não foi possível listar Produto por id");
        }
        return buildResult(true, "Produto listado com sucesso", modelSave);
    } catch (err) {
        logger.error("productService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar Produto por id");
    }
};

module.exports = {
    create,
    remove,
    update,
    getAll,
    getById,
};
