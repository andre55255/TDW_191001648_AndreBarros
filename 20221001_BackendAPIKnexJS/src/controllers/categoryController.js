const catService = require("../services/categoryService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /category");
        const model = req.body;

        const result = await catService.create(model);
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
        logger.error("categoryController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar categoria"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /category/:id");
        const { id } = req.params;

        const modelSave = await catService.getById(id);
        if (!modelSave || !modelSave.success) {
            logger.error(
                "categoryController getById - Categoria não encontrada: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Catgoria não encontrada"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Categoria listada com sucesso",
                    modelSave.object
                )
            );
    } catch (err) {
        logger.error(
            "categoryController getById - Falha ao listar categoria por id"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar categoria por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /category");
        const modelsSaves = await catService.getAll();
        if (!modelsSaves) {
            logger.error(
                "categoryController getAll - Categorias não encontradas"
            );
            return res
                .status(404)
                .json(
                    buildApiResponse(false, 404, "Categorias não encontradas")
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Categorias listadas com sucesso",
                    modelsSaves.object
                )
            );
    } catch (err) {
        logger.error(
            "categoryController getAll - Falha ao listar todas as categorias"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar todas as categorias")
            );
    }
};

const update = async (req, res) => {
    try {
        logger.info("Acessado PUT /category/:id");
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;

        const result = await catService.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("categoryController update - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao editar categoria"));
    }
};

const remove = async (req, res) => {
    try {
        logger.info("Acessado DELETE /category/:id");
        const { id } = req.params;
        const result = await catService.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "Categoria deletada com sucesso"));
    } catch (err) {
        logger.error("categoryController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover categoria"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
}