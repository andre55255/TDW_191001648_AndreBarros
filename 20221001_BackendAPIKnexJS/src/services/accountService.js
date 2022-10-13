const { authConfigJwt } = require("../helpers/constants");
const { logger } = require("../middlewares/logger");
const { buildResult } = require("../helpers/staticMethods");
const { compare } = require("bcrypt");
const userRepo = require("../repositories/userRepository");
const { sign } = require("jsonwebtoken");
const moment = require("moment");

const login = async ({ login, password }) => {
    try {
        const userSave = await userRepo.getByLogin(login);
        if (!userSave) {
            logger.warn("accountService login - Usuário não encontrado, usuario: " + login);
            return buildResult(false, "Usuário não encontrado");
        }
        const isPasswordCorrect = await compare(password, userSave.password);
        if (!isPasswordCorrect) {
            logger.warn("accountService login - Senha incorreta, usuario: " + login);
            return buildResult(false, "Senha incorreta");
        }
        const payloadJwt = {
            idUser: userSave.id,
            loginUser: userSave.login,
            roleId: userSave.roleId,
            roleName: userSave.roleName
        };
        const claims = {
            expiresIn: authConfigJwt.expires,
            audience: authConfigJwt.audience,
            issuer: authConfigJwt.issuer 
        }
        const jwtToken = sign(payloadJwt, process.env.JWT_KEY, claims);
        return buildResult(true, "Login efetuado com sucesso", {
            user: userSave.name,
            accessToken: jwtToken,
            expiresIn: moment().add(-3, "hour").add(authConfigJwt.expiresHr, "hour").toDate()
        });
    } catch (err) {
        logger.error("accountService login - Exceção: " + err);
        return buildResult(false, "Falha ao realizar login");
    }
};

module.exports = {
    login,
};