const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const create = async (model) => {
    try {
        const resultInserted = await db.insert(model).into("TB_Categoria");

        if (!resultInserted) {
            logger.error("categoryRepository create - Erro ao inserir");
            buildResult(false, "categoryRepository create - Erro ao inserir");
        }

        return buildResult(true, "Categoria criada", { id: resultInserted[0] });
    } catch (err) {
        logger.error("categoryRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar categoria na base de dados");
    }
};

const update = async (model, id) => {
    try {
        const resultUpdated = await db
            .update(model)
            .table("TB_Categoria")
            .where("TB_Categoria.IDCategoria", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar categoria");
        }

        return buildResult(true, "Categoria editada com sucesso");
    } catch (err) {
        logger.error("categoryRepository update - Exceção: " + err);
        return buildResult(false, "Falha ao editar categoria na base de dados");
    }
};

const remove = async (id) => {
    try {
        const resultDeleted = await db
            .select()
            .table("TB_Categoria")
            .where("TB_Categoria.IDCategoria", id)
            .del();

        if (!resultDeleted) {
            return buildResult(false, "Falha ao deletar categoria");
        }

        return buildResult(true, "Categoria deletada com sucesso");
    } catch (err) {
        logger.error("categoryRepository remove - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao deletar categoria na base de dados"
        );
    }
};

const getById = async (id) => {
    try {
        const modelSave = await db
            .select([
                "TB_Categoria.IDCategoria as id",
                "TB_Categoria.Descricao as description",
            ])
            .table("TB_Categoria")
            .where("TB_Categoria.IDCategoria", id);

        if (!modelSave) {
            return null;
        }

        return modelSave[0];
    } catch (err) {
        logger.error("categoryRepository getById - Exceção: " + err);
        return null;
    }
};

const getByDescription = async (description) => {
    try {
        const modelSave = await db
            .select([
                "TB_Categoria.IDCategoria as id",
                "TB_Categoria.Descricao as description",
            ])
            .table("TB_Categoria")
            .where("TB_Categoria.Descricao", description);

        if (!modelSave) {
            return null;
        }

        return modelSave[0];
    } catch (err) {
        logger.error("categoryRepository getByDescription - Exceção: " + err);
        return null;
    }
};

const getAll = async () => {
    try {
        const modelSaves = await db
            .select([
                "TB_Categoria.IDCategoria as id",
                "TB_Categoria.Descricao as description",
            ])
            .table("TB_Categoria");

        if (!modelSaves) {
            return null;
        }

        return modelSaves;
    } catch (err) {
        logger.error("categoryRepository getAll - Exceção: " + err);
        return null;
    }
};

module.exports = {
    create,
    update,
    remove,
    getById,
    getByDescription,
    getAll,
};
