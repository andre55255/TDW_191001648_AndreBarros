const { db } = require("../domain/database");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");

const getRoleById = async (roleId) => {
    try {
        const roleSave = await db
            .select([
                "TB_Perfil.IDPerfil as id",
                "TB_Perfil.Descricao as description",
            ])
            .table("TB_Perfil")
            .where("TB_Perfil.IDPerfil", roleId);

        if (!roleSave) {
            return null;
        }

        return roleSave[0];
    } catch (err) {
        logger.error("userRepository getRoleById - Exceção: " + err);
        return null;
    }
};

const getByLogin = async (login) => {
    try {
        const userSave = await db
            .select([
                "TB_Usuario.IDUsuario as id",
                "TB_Usuario.Login as login",
                "TB_Usuario.Nome as name",
                "TB_Usuario.Senha as password",
                "TB_Usuario.Status as status",
                "TB_Usuario.IDPerfil as roleId",
                "TB_Perfil.Descricao as roleName",
            ])
            .table("TB_Usuario")
            .innerJoin("TB_Perfil", "TB_Perfil.IDPerfil", "TB_Usuario.IDPerfil")
            .where("TB_Usuario.Login", login);

        if (!userSave) {
            return null;
        }

        return userSave[0];
    } catch (err) {
        logger.error("userRepository getByLogin - Exceção: " + err);
        return null;
    }
};

const getById = async (id) => {
    try {
        const userSave = await db
            .select([
                "TB_Usuario.IDUsuario as id",
                "TB_Usuario.Login as login",
                "TB_Usuario.Nome as name",
                //"TB_Usuario.Senha as password",
                "TB_Usuario.Status as status",
                "TB_Usuario.IDPerfil as roleId",
                "TB_Perfil.Descricao as roleName",
            ])
            .table("TB_Usuario")
            .innerJoin("TB_Perfil", "TB_Perfil.IDPerfil", "TB_Usuario.IDPerfil")
            .where("TB_Usuario.IDUsuario", id);

        if (!userSave) {
            return null;
        }

        return userSave[0];
    } catch (err) {
        logger.error("userRepository getById - Exceção: " + err);
        return null;
    }
};

const create = async (user) => {
    try {
        const resultInserted = await db.insert(user).into("TB_Usuario");

        if (!resultInserted) {
            logger.error("userRepository create - Erro ao inserir");
            buildResult(false, "userRepository create - Erro ao inserir");
        }

        return buildResult(true, "Usuário criado", { id: resultInserted[0] });
    } catch (err) {
        logger.error("userRepository create - Exceção: " + err);
        return buildResult(false, "Falha ao criar usuário na base de dados");
    }
};

module.exports = {
    getRoleById,
    getById,
    getByLogin,
    create,
};
