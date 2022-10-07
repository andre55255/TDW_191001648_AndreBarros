const { hash } = require("bcrypt");
const userRepo = require("../repositories/userRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (user) => {
    try {
        const { login, name, password, roleId } = user;
        const roleExist = await userRepo.getRoleById(roleId);
        if (!roleExist) {
            logger.warn(
                "userService create - Perfil não encontrado, usuario: " + roleId
            );
            return buildResult(false, "Perfil não encontrado");
        }
        const userLoginExists = await userRepo.getByLogin(login);
        if (userLoginExists) {
            logger.warn(
                "userService create - Já existe um usuário com este login: " + login
            );
            return buildResult(false, "userService create - Já existe um usuário com este login: " + login);
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
            return buildResult(
                true,
                "Usuário criado com sucesso",
                userSave
            );
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
}

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
} 

module.exports = {
    create,
    getAll,
    getById
};
