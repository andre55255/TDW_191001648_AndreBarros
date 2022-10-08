const movementService = require("../services/movementService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /movement");
        const model = req.body;
        model.userId = req.user.idUser;

        const result = await movementService.create(model);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(
                    buildApiResponse(false, 400, result.message, result.object)
                );
        }
        return res
            .status(201)
            .json(buildApiResponse(true, 201, result.message, result.object));
    } catch (err) {
        logger.error("movementController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar movimento"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /movement/:id");
        const { id } = req.params;

        const modelSave = await movementService.getById(id);
        if (!modelSave || !modelSave.success) {
            logger.error(
                "movementController getById - Movimento não encontrado: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Movimento não encontrado"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Movimento listado com sucesso",
                    modelSave.object
                )
            );
    } catch (err) {
        logger.error(
            "movementController getById - Falha ao listar movimento por id"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar movimento por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /movement");
        const modelsSaves = await movementService.getAll();
        if (!modelsSaves) {
            logger.error(
                "movementController getAll - Movimentos não encontrados"
            );
            return res
                .status(404)
                .json(
                    buildApiResponse(false, 404, "Movimentos não encontrados")
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Movimentos listados com sucesso",
                    modelsSaves.object
                )
            );
    } catch (err) {
        logger.error(
            "movementController getAll - Falha ao listar todas os movimentos"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar todas os movimentos")
            );
    }
};

const update = async (req, res) => {
    try {
        logger.info("Acessado PUT /movement/:id");
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;
        modelSave.userId = req.user.idUser;

        const result = await movementService.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("movementController update - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao editar movimento"));
    }
};

const remove = async (req, res) => {
    try {
        logger.info("Acessado DELETE /movement/:id");
        const { id } = req.params;
        const result = await movementService.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "Movimento deletado com sucesso"));
    } catch (err) {
        logger.error("movementController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover movimento"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
}