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

const getAll = async () => {
    try {
        const userSaves = await db
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
            .innerJoin("TB_Perfil", "TB_Perfil.IDPerfil", "TB_Usuario.IDPerfil");

        if (!userSaves) {
            return null;
        }

        return userSaves;
    } catch (err) {
        logger.error("userRepository getAll - Exceção: " + err);
        return null;
    }
}

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

const update = async (user, id) => {
    try {
        const resultUpdated = await db.update(user)
                .table("TB_Usuario")
                .where("TB_Usuario.IDUsuario", id);

        if (!resultUpdated) {
            return buildResult(false, "Falha ao editar usuário");
        }

        return buildResult(true, "Usuário editado com sucesso");
    } catch (err) {
        logger.error("userRepository update - Exceção: " + err);
        return buildResult(false, "Falha ao editar usuário na base de dados");
    }
}

const remove = async (id) => {
    try {
        const resultDeleted = await db
                .select()
                .table("TB_Usuario")
                .where("TB_Usuario.IDUsuario", id)
                .del();

        if (!resultDeleted) {
            return buildResult(false, "Falha ao deletar usuário");
        }

        return buildResult(true, "Usuário deletar com sucesso");
    } catch (err) {
        logger.error("userRepository remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar usuário na base de dados");
    }
}

module.exports = {
    getRoleById,
    getById,
    getByLogin,
    getAll,
    create,
    update,
    remove
};
