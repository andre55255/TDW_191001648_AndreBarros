const unitOfMeasRepo = require("../repositories/unitOfMeasurementRepository");
const prodRepo = require("../repositories/productRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (model) => {
    try {
        const { id, description } = model;

        const modelExist = await unitOfMeasRepo.getByDescription(description);
        if (modelExist) {
            logger.error(
                "unitOfMeasumentService create - Unidade de medida já existe: " + description
            );
            return buildResult(false, "Unidade de medida já existe");
        }

        const modelEntity = {
            Descricao: description,
        };
        const resultCreated = await unitOfMeasRepo.create(modelEntity);
        if (!resultCreated.success) {
            logger.error(
                "unitOfMeasumentService create - Falha ao criar Unidade de medida: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar Unidade de medida");
        }
        logger.error(
            "unitOfMeasumentService create - Unidade de medida criada com sucesso: " +
                description
        );

        const modelSave = await unitOfMeasRepo.getById(resultCreated.object.id);
        return buildResult(true, "Unidade de medida criada com sucesso", modelSave);
    } catch (err) {
        logger.error("unitOfMeasumentService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar Unidade de medida");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await unitOfMeasRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "unitOfMeasumentService remove - Unidade de medida não existe, id: " + id
            );
            return buildResult(false, "Unidade de medida não encontrada");
        }

        const productsWithUnit = await prodRepo.getProductsByUnitOfMeasurementId(id);
        if (productsWithUnit && productsWithUnit.length) {
            logger.error(
                "unitOfMeasumentService remove - Unidade de medida possui vinculo com um ou mais produtos, id: " +
                    id
            );
            return buildResult(
                false,
                `Unidade de medida possui vinculo com ${productsWithUnit.length} produtos`
            );
        }

        const resultDeleted = await unitOfMeasRepo.remove(id);
        if (!resultDeleted.success) {
            logger.error(
                "unitOfMeasumentService remove - Falha ao deletar, id: " + id
            );
            return buildResult(false, "Falha ao deletar Unidade de medida");
        }
        logger.info(
            "unitOfMeasumentService remove - Unidade de medida deletada com sucesso, id: " + id
        );
        return buildResult(true, "Unidade de medida deletada com sucesso");
    } catch (err) {
        logger.error("unitOfMeasumentService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar Unidade de medida");
    }
};

const update = async (model) => {
    try {
        const { id, description } = model;

        const modelExist = await unitOfMeasRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "unitOfMeasumentService update - Unidade de medida não encontrada: " +
                    description
            );
            return buildResult(false, "Unidade de medida não encontrada");
        }

        const modelNameExist = await unitOfMeasRepo.getByDescription(description);
        if (modelNameExist && modelNameExist.id != id) {
            logger.error(
                "unitOfMeasumentService update - Já existe uma unidade de medida com este nome no banco: " +
                    description
            );
            return buildResult(false, "Já existe uma unidade de medida com este nome no banco");
        }

        const modelEntity = {
            IDUnidadeMedida: id,
            Descricao: description,
        };
        const result = await unitOfMeasRepo.update(modelEntity, id);
        if (!result.success) {
            logger.error(
                "unitOfMeasumentService update - Falha ao editar Unidade de medida: " +
                result.message
            );
            return buildResult(false, "Falha ao editar Unidade de medida");
        }
        logger.info(
            "unitOfMeasumentService update - Unidade de medida editada com sucesso: " +
                description
        );

        const modelSave = await unitOfMeasRepo.getById(id);
        return buildResult(true, "Unidade de medida editada com sucesso", modelSave);
    } catch (err) {
        logger.error("unitOfMeasumentService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar Unidade de medida");
    }
};

const getAll = async () => {
    try {
        const modelSaves = await unitOfMeasRepo.getAll();
        if (!modelSaves) {
            return buildResult(false, "Não foi possível listar Unidade de medidas");
        }
        return buildResult(true, "Unidade de medidas listadas com sucesso", modelSaves);
    } catch (err) {
        logger.error("unitOfMeasumentService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar Unidade de medidas");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await unitOfMeasRepo.getById(id);
        if (!modelSave) {
            return buildResult(
                false,
                "Não foi possível listar Unidade de medida por id"
            );
        }
        return buildResult(true, "Unidade de medida listado com sucesso", modelSave);
    } catch (err) {
        logger.error("unitOfMeasumentService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar Unidade de medida por id");
    }
};

module.exports = {
    create,
    remove,
    update,
    getAll,
    getById,
};
