const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const create = async (model) => {
    try {
        const resultInserted = await db.insert(model).into("TB_Movimento");

        if (!resultInserted) {
            logger.error("movementRepository create - Erro ao inserir");
            buildResult(false, "movementRepository create - Erro ao inserir");
        }

        return buildResult(true, "Movimento criado", { id: resultInserted[0] });
    } catch (err) {
        logger.error("movementRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar Movimento na base de dados");
    }
};

const update = async (model, id) => {
    try {
        const resultUpdated = await db
            .update(model)
            .table("TB_Movimento")
            .where("TB_Movimento.IDMovimento", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar Movimento");
        }

        return buildResult(true, "Movimento editada com sucesso");
    } catch (err) {
        logger.error("movementRepository update - Exceção: " + err);
        return buildResult(false, "Falha ao editar Movimento na base de dados");
    }
};

const remove = async (id) => {
    try {
        const resultDeleted = await db
            .select()
            .table("TB_Movimento")
            .where("TB_Movimento.IDMovimento", id)
            .del();

        if (!resultDeleted) {
            return buildResult(false, "Falha ao deletar Movimento");
        }

        return buildResult(true, "Movimento deletado com sucesso");
    } catch (err) {
        logger.error("movementRepository remove - Exceção: " + err);
        return buildResult(
            false,
            "Falha ao deletar Movimento na base de dados"
        );
    }
};

const getById = async (id) => {
    try {
        const modelSave = await db
            .select([
                "TB_Movimento.IDMovimento as id",
                "TB_Movimento.Descricao as description",
                "TB_Movimento.Tipo as type",
                "TB_Movimento.DataMovimento as date",
                "TB_Movimento.Valor as totalValue",
                "TB_Usuario.IDUsuario as userId",
                "TB_Usuario.Login as userLogin",
                "TB_Usuario.Nome as userName",
                "TB_Usuario.Status as userStatus",
                "TB_Perfil.IDPerfil as roleId",
                "TB_Perfil.Descricao as roleName",
            ])
            .table("TB_Movimento")
            .innerJoin(
                "TB_Usuario",
                "TB_Movimento.IDUsuario",
                "TB_Usuario.IDUsuario"
            )
            .innerJoin("TB_Perfil", "TB_Perfil.IDPerfil", "TB_Usuario.IDPerfil")
            .where("TB_Movimento.IDMovimento", id);

        if (!modelSave) {
            return null;
        }

        const modelReturn = {
            id: modelSave[0].id,
            description: modelSave[0].description,
            type: modelSave[0].type,
            date: modelSave[0].date,
            totalValue: modelSave[0].totalValue,
            user: {
                id: modelSave[0].userId,
                login: modelSave[0].userLogin,
                name: modelSave[0].userName,
                status: modelSave[0].userStatus,
                role: {
                    id: modelSave[0].roleId,
                    name: modelSave[0].roleName,
                },
            },
        };

        return modelReturn;
    } catch (err) {
        logger.error("movementRepository getById - Exceção: " + err);
        return null;
    }
};

const getByUserId = async (id) => {
    try {
        const modelSave = await db
            .select([
                "TB_Movimento.IDMovimento as id",
                "TB_Movimento.Descricao as description",
                "TB_Movimento.Tipo as type",
                "TB_Movimento.DataMovimento as date",
                "TB_Movimento.Valor as totalValue",
                "TB_Usuario.IDUsuario as userId",
                "TB_Usuario.Login as userLogin",
                "TB_Usuario.Nome as userName",
                "TB_Usuario.Status as userStatus",
                "TB_Perfil.IDPerfil as roleId",
                "TB_Perfil.Descricao as roleName",
            ])
            .table("TB_Movimento")
            .innerJoin(
                "TB_Usuario",
                "TB_Movimento.IDUsuario",
                "TB_Usuario.IDUsuario"
            )
            .innerJoin("TB_Perfil", "TB_Perfil.IDPerfil", "TB_Usuario.IDPerfil")
            .where("TB_Movimento.IDUsuario", id);

        if (!modelSave) {
            return null;
        }

        const modelReturn = {
            id: modelSave[0].id,
            description: modelSave[0].description,
            type: modelSave[0].type,
            date: modelSave[0].date,
            totalValue: modelSave[0].totalValue,
            user: {
                id: modelSave[0].userId,
                login: modelSave[0].userLogin,
                name: modelSave[0].userName,
                status: modelSave[0].userStatus,
                role: {
                    id: modelSave[0].roleId,
                    name: modelSave[0].roleName,
                },
            },
        };

        return modelReturn;
    } catch (err) {
        logger.error("movementRepository getByUserId - Exceção: " + err);
        return null;
    }
};

const getAll = async () => {
    try {
        const modelSaves = await db
            .select([
                "TB_Movimento.IDMovimento as id",
                "TB_Movimento.Descricao as description",
                "TB_Movimento.Tipo as type",
                "TB_Movimento.DataMovimento as date",
                "TB_Movimento.Valor as totalValue",
                "TB_Usuario.IDUsuario as userId",
                "TB_Usuario.Login as userLogin",
                "TB_Usuario.Nome as userName",
                "TB_Usuario.Status as userStatus",
                "TB_Perfil.IDPerfil as roleId",
                "TB_Perfil.Descricao as roleName",
            ])
            .table("TB_Movimento")
            .innerJoin(
                "TB_Usuario",
                "TB_Movimento.IDUsuario",
                "TB_Usuario.IDUsuario"
            )
            .innerJoin(
                "TB_Perfil",
                "TB_Perfil.IDPerfil",
                "TB_Usuario.IDPerfil"
            );

        if (!modelSaves) {
            return null;
        }

        const modelReturn = modelSaves.map((item) => {
            return {
                id: item.id,
                description: item.description,
                type: item.type,
                date: item.date,
                totalValue: item.totalValue,
                user: {
                    id: item.userId,
                    login: item.userLogin,
                    name: item.userName,
                    status: item.userStatus,
                    role: {
                        id: item.roleId,
                        name: item.roleName,
                    },
                },
            };
        });

        return modelReturn;
    } catch (err) {
        logger.error("movementRepository getAll - Exceção: " + err);
        return null;
    }
};

module.exports = {
    create,
    update,
    remove,
    getById,
    getByUserId,
    getAll,
};
