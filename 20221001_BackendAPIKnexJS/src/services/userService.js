const { hash } = require("bcrypt");
const userRepo = require("../repositories/userRepository");
const roleRepo = require("../repositories/roleRepository");
const movementRepo = require("../repositories/movementRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (user) => {
    try {
        const { login, name, password, roleId } = user;
        const roleExist = await roleRepo.getById(roleId);
        if (!roleExist) {
            logger.warn(
                "userService create - Perfil não encontrado, usuario: " + roleId
            );
            return buildResult(false, "Perfil não encontrado");
        }
        const userLoginExists = await userRepo.getByLogin(login);
        if (userLoginExists) {
            logger.warn(
                "userService create - Já existe um usuário com este login: " +
                    login
            );
            return buildResult(
                false,
                "userService create - Já existe um usuário com este login: " +
                    login
            );
        }
        const hashPassword = await hash(password, 10);
        if (!hashPassword) {
            logger.warn(
                "userService create - Falha ao encriptar senha de usuário: " +
                    user.login
            );
            return buildResult(
                false,
                "Falha ao tratar senha para criar usuário"
            );
        }
        const userEntitySave = {
            Login: login,
            Nome: name,
            Senha: hashPassword,
            Status: "Criado",
            IDPerfil: roleId,
        };
        const resultCreated = await userRepo.create(userEntitySave);
        if (resultCreated.success) {
            logger.info("userService create - Usuário criado, login: " + login);
            const userSave = await userRepo.getById(resultCreated.object.id);
            return buildResult(true, "Usuário criado com sucesso", userSave);
        }
        logger.info(
            `userService create - Falha ao criar usuário, login ${login}, exceção: ${resultCreated.message}`
        );
        return buildResult(false, "Falha ao criar usuário");
    } catch (err) {
        logger.error("userService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar usuário");
    }
};

const getAll = async () => {
    try {
        const users = await userRepo.getAll();
        if (!users) {
            return buildResult(false, "Não foi possível listar usuários");
        }
        return buildResult(true, "Usuários listados com sucesso", users);
    } catch (err) {
        logger.error("userService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar usuários");
    }
};

const getById = async (id) => {
    try {
        const users = await userRepo.getById(id);
        if (!users) {
            return buildResult(false, "Não foi possível lista usuário por id");
        }
        return buildResult(true, "Usuários listado com sucesso", users);
    } catch (err) {
        logger.error("userService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar usuário por id");
    }
};

const update = async (user) => {
    try {
        const { id, login, name, password, roleId } = user;

        const userByIdExist = await userRepo.getById(id);
        if (!userByIdExist) {
            logger.error(
                "userService update - Usuário não encontrado, id: " + id
            );
            return buildResult(false, "Usuário não encontrado");
        }

        const userByLoginExist = await userRepo.getByLogin(login);
        if (userByLoginExist && userByIdExist.id != id) {
            logger.error(
                "userService update - Usuário não encontrado, login: " + login
            );
            return buildResult(false, "Usuário não encontrado");
        }

        const hashPassword = await hash(password, 10);
        if (!hashPassword) {
            logger.warn(
                "userService update - Falha ao encriptar senha de usuário: " +
                    user.login
            );
            return buildResult(
                false,
                "Falha ao tratar senha para criar usuário"
            );
        }
        const userEntitySave = {
            Login: login,
            Nome: name,
            Senha: hashPassword,
            Status: "Editado",
            IDPerfil: roleId,
        };
        const result = await userRepo.update(userEntitySave, id);
        if (result.success) {
            logger.info(
                "userService update - Usuário editado, login: " + login
            );
            const userSave = await userRepo.getById(result.object.id);
            return buildResult(true, "Usuário editado com sucesso", userSave);
        }
        logger.info(
            `userService update - Falha ao editar usuário, login ${login}, exceção: ${result.message}`
        );
        return buildResult(false, "Falha ao editar usuário");
    } catch (err) {
        logger.error("userService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar usuário");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await userRepo.getById(id);
        if (!modelExist) {
            logger.error("userService remove - usuário não existe, id: " + id);
            return buildResult(false, "usuário não encontrado");
        }

        const usersWithMovements = await movementRepo.getByUserId(id);
        if (usersWithMovements && usersWithMovements.length) {
            logger.error(
                "userService remove - Usuário possui vinculo com um ou mais movimentos, id: " +
                    id
            );
            return buildResult(
                false,
                `usuário possui vinculo com ${usersWithMovements.length} movimentos`
            );
        }

        const resultDeleted = await userRepo.remove(id);
        if (!resultDeleted.success) {
            logger.error("userService remove - Falha ao deletar, id: " + id);
            return buildResult(false, "Falha ao deletar usuário");
        }
        logger.info(
            "userService remove - usuário deletado com sucesso, id: " + id
        );
        return buildResult(true, "usuário deletado com sucesso");
    } catch (err) {
        logger.error("userService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar usuário");
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};
