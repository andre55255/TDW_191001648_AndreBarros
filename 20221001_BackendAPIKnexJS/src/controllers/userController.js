const userService = require("../services/userService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /user");
        const user = req.body;

        const result = await userService.create(user);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(
                    buildApiResponse(false, 400, result.message, result.object)
                );
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("userController login - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar usuário"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /user/:id");
        const { id } = req.params;

        const userSave = await userService.getById(id);
        if (!userSave.success) {
            logger.error(
                "userController getById - Usuário não encontrado: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Usuário não encontrado"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Usuário listado com sucesso",
                    userSave.object
                )
            );
    } catch (err) {
        logger.error("userController getById - Falha ao listar usuário por id");
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar usuário por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /user");
        const users = await userService.getAll();
        if (!users) {
            logger.error("userController getAll - Usuários não encontrados");
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Usuários não encontrados"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Usuários listados com sucesso",
                    users.object
                )
            );
    } catch (err) {
        logger.error("userController getAll - Falha ao listar usuário por id");
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar usuário por id")
            );
    }
};

const update = async (req, res) => {
    try {
        logger.info("Acessado PUT /user/:id");
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;

        const result = await userService.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("userController update - Exceção: " + err);
        return res
            .status(500)
            .json(
                buildApiResponse(
                    false,
                    500,
                    "Falha ao editar usuário"
                )
            );
    }
};

const remove = async (req, res) => {
    try {
        logger.info("Acessado DELETE /user/:id");
        const { id } = req.params;
        const result = await userService.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "Usuário deletado com sucesso"));
    } catch (err) {
        logger.error("userController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover usuário"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
};
