const catRepo = require("../repositories/categoryRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (model) => {
    try {
        const { description } = model;

        const modelExist = await catRepo.getByDescription(description);
        if (modelExist) {
            logger.error(
                "categoryService create - Categoria já existe: " + description
            );
            return buildResult(false, "Categoria já existe");
        }

        const modelEntity = {
            Descricao: description,
        };
        const resultCreated = await catRepo.create(modelEntity);
        if (!resultCreated.success) {
            logger.error(
                "categoryService create - Falha ao criar categoria: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar categoria");
        }
        logger.error(
            "categoryService create - Categoria criada com sucesso: " +
                description
        );

        const modelSave = await catRepo.getById(resultCreated.object.id);
        return buildResult(true, "Categoria criada com sucesso", modelSave);
    } catch (err) {
        logger.error("categoryService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar categoria");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await catRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "categoryService remove - Categoria não existe, id: " + id
            );
            return buildResult(false, "Categoria não encontrada");
        }
        const resultDeleted = await catRepo.remove(id);
        if (!resultDeleted.success) {
            logger.error(
                "categoryService remove - Falha ao deletar, id: " + id
            );
            return buildResult(false, "Falha ao deletar categoria");
        }
        logger.info(
            "categoryService remove - Categoria deletada com sucesso, id: " + id
        );
        return buildResult(true, "Categoria deletada com sucesso");
    } catch (err) {
        logger.error("categoryService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar categoria");
    }
};

const update = async (model) => {
    try {
        const { id, description } = model;

        const modelExist = await catRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "categoryService update - Categoria não encontrada: " +
                    description
            );
            return buildResult(false, "Categoria não encontrada");
        }

        const modelEntity = {
            IDCategoria: id,
            Descricao: description,
        };
        const result = await catRepo.update(modelEntity, id);
        if (!result.success) {
            logger.error(
                "categoryService update - Falha ao editar categoria: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao editar categoria");
        }
        logger.info(
            "categoryService update - Categoria editada com sucesso: " +
                description
        );

        const modelSave = await catRepo.getById(id);
        return buildResult(true, "Categoria editada com sucesso", modelSave);
    } catch (err) {
        logger.error("categoryService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar categoria");
    }
};

const getAll = async () => {
    try {
        const modelSaves = await catRepo.getAll();
        if (!modelSaves) {
            return buildResult(false, "Não foi possível listar categorias");
        }
        return buildResult(true, "Categorias listadas com sucesso", modelSaves);
    } catch (err) {
        logger.error("categoryService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar categorias");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await catRepo.getById(id);
        if (!modelSave) {
            return buildResult(
                false,
                "Não foi possível listar categoria por id"
            );
        }
        return buildResult(true, "Categoria listado com sucesso", modelSave);
    } catch (err) {
        logger.error("categoryService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar categoria por id");
    }
};

module.exports = {
    create,
    remove,
    update,
    getAll,
    getById,
};
