const roleRepo = require("../repositories/roleRepository");
const userRepo = require("../repositories/userRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (model) => {
    try {
        const { description } = model;

        const modelExist = await roleRepo.getByDescription(description);
        if (modelExist) {
            logger.error(
                "roleService create - Perfil já existe: " + description
            );
            return buildResult(false, "Perfil já existe");
        }

        const modelEntity = {
            Descricao: description,
        };
        const resultCreated = await roleRepo.create(modelEntity);
        if (!resultCreated.success) {
            logger.error(
                "roleService create - Falha ao criar Perfil: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar Perfil");
        }
        logger.error(
            "roleService create - Perfil criada com sucesso: " +
                description
        );

        const modelSave = await roleRepo.getById(resultCreated.object.id);
        return buildResult(true, "Perfil criado com sucesso", modelSave);
    } catch (err) {
        logger.error("roleService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar Perfil");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await roleRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "roleService remove - Perfil não existe, id: " + id
            );
            return buildResult(false, "Perfil não encontrada");
    }

        const usersWithRole = await userRepo.getByRoleId(id);
        if (usersWithRole && usersWithRole.length) {
            logger.error(
                "roleService remove - Perfil possui vínculo com usuários, id: " + id
            );
            return buildResult(false, `Perfil possui vínculo com ${usersWithRole.length} usuários`);
        }

        const resultDeleted = await roleRepo.remove(id);
        if (!resultDeleted.success) {
            logger.error(
                "roleService remove - Falha ao deletar, id: " + id
            );
            return buildResult(false, "Falha ao deletar Perfil");
        }
        logger.info(
            "roleService remove - Perfil deletada com sucesso, id: " + id
        );
        return buildResult(true, "Perfil deletada com sucesso");
    } catch (err) {
        logger.error("roleService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar Perfil");
    }
};

const update = async (model) => {
    try {
        const { id, description } = model;

        const modelExist = await roleRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "roleService update - Perfil não encontrado: " +
                    description
            );
            return buildResult(false, "Perfil não encontrado");
        }

        const modelNameExist = await roleRepo.getByDescription(description);
        if (modelNameExist && modelNameExist.id != id) {
            logger.error(
                "roleService update - Já existe um perfil com este nome no banco: " +
                    description
            );
            return buildResult(false, "Já existe um perfil com este nome no banco");
        }

        const modelEntity = {
            IDPerfil: id,
            Descricao: description,
        };
        const result = await roleRepo.update(modelEntity, id);
        if (!result.success) {
            logger.error(
                "roleService update - Falha ao editar Perfil: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao editar Perfil");
        }
        logger.info(
            "roleService update - Perfil editada com sucesso: " +
                description
        );

        const modelSave = await roleRepo.getById(id);
        return buildResult(true, "Perfil editada com sucesso", modelSave);
    } catch (err) {
        logger.error("roleService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar Perfil");
    }
};

const getAll = async () => {
    try {
        const modelSaves = await roleRepo.getAll();
        if (!modelSaves) {
            return buildResult(false, "Não foi possível listar Perfils");
        }
        return buildResult(true, "Perfis listados com sucesso", modelSaves);
    } catch (err) {
        logger.error("roleService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar Perfis");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await roleRepo.getById(id);
        if (!modelSave) {
            return buildResult(
                false,
                "Não foi possível listar Perfil por id"
            );
        }
        return buildResult(true, "Perfil listado com sucesso", modelSave);
    } catch (err) {
        logger.error("roleService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar Perfil por id");
    }
};

module.exports = {
    create,
    remove,
    update,
    getAll,
    getById,
};
