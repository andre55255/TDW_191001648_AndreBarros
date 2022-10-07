const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const create = async (model) => {
    try {
        const resultInserted = await db.insert(model).into("TB_UnidadeMedida");

        if (!resultInserted) {
            logger.error("unitOfMeasurementRepository create - Erro ao inserir");
            buildResult(false, "unitOfMeasurementRepository create - Erro ao inserir");
        }

        return buildResult(true, "Unidade de medida criada", { id: resultInserted[0] });
    } catch (err) {
        logger.error("unitOfMeasurementRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar unidade de medida na base de dados");
    }
};

const update = async (model, id) => {
    try {
        const resultUpdated = await db
            .update(model)
            .table("TB_UnidadeMedida")
            .where("TB_UnidadeMedida.IDUnidadeMedida", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar unidade de medida");
        }

        return buildResult(true, "Unidade de medida editada com sucesso");
    } catch (err) {
        logger.error("unitOfMeasurementRepository update - Exceção: " + err);
        return buildResult(false, "Falha ao editar unidade de medida na base de dados");
    }
};

const remove = async (id) => {
    try {
        const resultDeleted = await db
            .select()
            .table("TB_UnidadeMedida")
            .where("TB_UnidadeMedida.IDUnidadeMedida", id)
            .del();

        if (!resultDeleted) {
            return buildResult(false, "Falha ao deletar unidade de medida");
        }

        return buildResult(true, "Unidade de medida deletada com sucesso");
    } catch (err) {
        logger.error("unitOfMeasurementRepository remove - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao deletar unidade de medida na base de dados"
        );
    }
};

const getById = async (id) => {
    try {
        const modelSave = await db
            .select([
                "TB_UnidadeMedida.IDUnidadeMedida as id",
                "TB_UnidadeMedida.Descricao as description",
            ])
            .table("TB_UnidadeMedida")
            .where("TB_UnidadeMedida.IDUnidadeMedida", id);

        if (!modelSave) {
            return null;
        }

        return modelSave[0];
    } catch (err) {
        logger.error("unitOfMeasurementRepository getById - Exceção: " + err);
        return null;
    }
};

const getByDescription = async (description) => {
    try {
        const modelSave = await db
            .select([
                "TB_UnidadeMedida.IDUnidadeMedida as id",
                "TB_UnidadeMedida.Descricao as description",
            ])
            .table("TB_UnidadeMedida")
            .where("TB_UnidadeMedida.Descricao", description);

        if (!modelSave) {
            return null;
        }

        return modelSave[0];
    } catch (err) {
        logger.error("unitOfMeasurementRepository getByDescription - Exceção: " + err);
        return null;
    }
};

const getAll = async () => {
    try {
        const modelSaves = await db
            .select([
                "TB_UnidadeMedida.IDUnidadeMedida as id",
                "TB_UnidadeMedida.Descricao as description",
            ])
            .table("TB_UnidadeMedida");

        if (!modelSaves) {
            return null;
        }

        return modelSaves;
    } catch (err) {
        logger.error("unitOfMeasurementRepository getAll - Exceção: " + err);
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
