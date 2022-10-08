const roleService = require("../services/roleService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /role");
        const model = req.body;

        const result = await roleService.create(model);
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
        logger.error("roleController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar perfil"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /role/:id");
        const { id } = req.params;

        const modelSave = await roleService.getById(id);
        if (!modelSave || !modelSave.success) {
            logger.error(
                "roleController getById - perfil não encontrado: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Perfil não encontrado"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Perfil listado com sucesso",
                    modelSave.object
                )
            );
    } catch (err) {
        logger.error(
            "roleController getById - Falha ao listar perfil por id"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar perfil por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /role");
        const modelsSaves = await roleService.getAll();
        if (!modelsSaves) {
            logger.error(
                "roleController getAll - perfis não encontrados"
            );
            return res
                .status(404)
                .json(
                    buildApiResponse(false, 404, "perfis não encontrados")
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "perfis listados com sucesso",
                    modelsSaves.object
                )
            );
    } catch (err) {
        logger.error(
            "roleController getAll - Falha ao listar todas as perfis"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar todas as perfis")
            );
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;

        const result = await roleService.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("roleController update - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao editar perfil"));
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await roleService.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "perfil deletado com sucesso"));
    } catch (err) {
        logger.error("roleController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover perfil"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
}