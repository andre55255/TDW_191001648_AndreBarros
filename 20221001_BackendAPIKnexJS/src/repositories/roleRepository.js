const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const create = async (model) => {
    try {
        const resultInserted = await db.insert(model).into("TB_Perfil");

        if (!resultInserted) {
            logger.error("roleRepository create - Erro ao inserir");
            buildResult(false, "roleRepository create - Erro ao inserir");
        }

        return buildResult(true, "Perfil criado", { id: resultInserted[0] });
    } catch (err) {
        logger.error("roleRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar Perfil na base de dados");
    }
};

const update = async (model, id) => {
    try {
        const resultUpdated = await db
            .update(model)
            .table("TB_Perfil")
            .where("TB_Perfil.IDPerfil", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar Perfil");
        }

        return buildResult(true, "Perfil editada com sucesso");
    } catch (err) {
        logger.error("roleRepository update - Exceção: " + err);
        return buildResult(false, "Falha ao editar Perfil na base de dados");
    }
};

const remove = async (id) => {
    try {
        const resultDeleted = await db
            .select()
            .table("TB_Perfil")
            .where("TB_Perfil.IDPerfil", id)
            .del();

        if (!resultDeleted) {
            return buildResult(false, "Falha ao deletar Perfil");
        }

        return buildResult(true, "Perfil deletada com sucesso");
    } catch (err) {
        logger.error("roleRepository remove - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao deletar Perfil na base de dados"
        );
    }
};

const getById = async (id) => {
    try {
        const modelSave = await db
            .select([
                "TB_Perfil.IDPerfil as id",
                "TB_Perfil.Descricao as description",
            ])
            .table("TB_Perfil")
            .where("TB_Perfil.IDPerfil", id);

        if (!modelSave) {
            return null;
        }

        return modelSave[0];
    } catch (err) {
        logger.error("roleRepository getById - Exceção: " + err);
        return null;
    }
};

const getByDescription = async (description) => {
    try {
        const modelSave = await db
            .select([
                "TB_Perfil.IDPerfil as id",
                "TB_Perfil.Descricao as description",
            ])
            .table("TB_Perfil")
            .where("TB_Perfil.Descricao", description);

        if (!modelSave) {
            return null;
        }

        return modelSave[0];
    } catch (err) {
        logger.error("roleRepository getByDescription - Exceção: " + err);
        return null;
    }
};

const getAll = async () => {
    try {
        const modelSaves = await db
            .select([
                "TB_Perfil.IDPerfil as id",
                "TB_Perfil.Descricao as description",
            ])
            .table("TB_Perfil");

        if (!modelSaves) {
            return null;
        }

        return modelSaves;
    } catch (err) {
        logger.error("roleRepository getAll - Exceção: " + err);
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
