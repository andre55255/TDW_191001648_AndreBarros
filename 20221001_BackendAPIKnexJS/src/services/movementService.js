const movementRepo = require("../repositories/movementRepository");
const userRepo = require("../repositories/userRepository");
const { buildResult } = require("../helpers/staticMethods");
const { logger } = require("../middlewares/logger");

const create = async (model) => {
    try {
        const { description, date, value, userId } = model;

        const userExist = await userRepo.getById(userId);
        if (!userExist) {
            logger.error(
                "movementService create - Usuário não encontrado para vincular, id: " +
                    userId
            );
            return buildResult(false, "Usuário não encontrado para vincular");
        }

        const modelEntity = {
            Descricao: description,
            Tipo: value <= 0 ? "Saída" : "Entrada",
            DataMovimento: date,
            Valor: value,
            IDUsuario: userId,
        };
        const resultCreated = await movementRepo.create(modelEntity);
        if (!resultCreated.success) {
            logger.error(
                "movementService create - Falha ao criar movimento: " +
                    resultCreated.message
            );
            return buildResult(false, "Falha ao criar movimento");
        }
        logger.error(
            "movementService create - Movimento criado com sucesso: " +
                description
        );

        const modelSave = await movementRepo.getById(resultCreated.object.id);
        return buildResult(true, "Movimento criado com sucesso", modelSave);
    } catch (err) {
        logger.error("movementService create - Exceção: " + err);
        return buildResult(false, "Falha ao criar movimento");
    }
};

const remove = async (id) => {
    try {
        const modelExist = await movementRepo.getById(id);
        if (!modelExist) {
            logger.error(
                "movementService remove - Movimento não existe, id: " + id
            );
            return buildResult(false, "Movimento não encontrado");
        }

        const resultDeleted = await movementRepo.remove(id);
        if (!resultDeleted.success) {
            logger.error(
                "movementService remove - Falha ao deletar, id: " + id
            );
            return buildResult(false, "Falha ao deletar movimento");
        }
        logger.info(
            "movementService remove - Movimento deletado com sucesso, id: " + id
        );
        return buildResult(true, "Movimento deletado com sucesso");
    } catch (err) {
        logger.error("movementService remove - Exceção: " + err);
        return buildResult(false, "Falha ao deletar movimento");
    }
};

const update = async (model) => {
    try {
        const { id, description, type, date, value, userId } = model;

        const movementExist = await movementRepo.getById(id);
        if (!movementExist) {
            logger.error(
                "movementService update - Movimento não encontrado, id: " + id
            );
            return buildResult(false, "Movimento não encontrado");
        }

        const userExist = await userRepo.getById(userId);
        if (!userExist) {
            logger.error(
                "movementService update - Usuário não encontrado para vincular, id: " +
                    userId
            );
            return buildResult(false, "Usuário não encontrado para vincular");
        }

        const modelEntity = {
            IDMovimento: id,
            Descricao: description,
            Tipo: type,
            DataMovimento: date,
            Valor: value,
            IDUsuario: userId
        };
        const result = await movementRepo.update(modelEntity, id);
        if (!result.success) {
            logger.error(
                "movementService update - Falha ao editar movimento: " +
                    result.message
            );
            return buildResult(false, "Falha ao editar movimento");
        }
        logger.error(
            "movementService update - Movimento editado com sucesso: " +
                description
        );

        const modelSave = await movementRepo.getById(result.object.id);
        return buildResult(true, "Movimento editado com sucesso", modelSave);
    } catch (err) {
        logger.error("movementService update - Exceção: " + err);
        return buildResult(false, "Falha ao editar movimento");
    }
};

const getAll = async () => {
    try {
        const modelSaves = await movementRepo.getAll();
        if (!modelSaves) {
            return buildResult(false, "Não foi possível listar movimentos");
        }
        return buildResult(true, "Movimentos listados com sucesso", modelSaves);
    } catch (err) {
        logger.error("movementService getAll - Exceção: " + err);
        return buildResult(false, "Falha ao buscar movimentos");
    }
};

const getById = async (id) => {
    try {
        const modelSave = await movementRepo.getById(id);
        if (!modelSave) {
            return buildResult(false, "Não foi possível listar movimento por id");
        }
        return buildResult(true, "Movimento listado com sucesso", modelSave);
    } catch (err) {
        logger.error("movementService getById - Exceção: " + err);
        return buildResult(false, "Falha ao listar movimento por id");
    }
};

module.exports = {
    create,
    remove,
    update,
    getAll,
    getById,
};
