const productService = require("../services/productService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /product");
        const model = req.body;

        const result = await productService.create(model);
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
        logger.error("productController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar produto"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /product/:id");
        const { id } = req.params;

        const modelSave = await productService.getById(id);
        if (!modelSave || !modelSave.success) {
            logger.error(
                "productController getById - produto não encontrado: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Produto não encontrado"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Produto listado com sucesso",
                    modelSave.object
                )
            );
    } catch (err) {
        logger.error(
            "productController getById - Falha ao listar produto por id"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar produto por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /product");
        const modelsSaves = await productService.getAll();
        if (!modelsSaves) {
            logger.error(
                "productController getAll - produtos não encontrados"
            );
            return res
                .status(404)
                .json(
                    buildApiResponse(false, 404, "Produtos não encontrados")
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Produtos listados com sucesso",
                    modelsSaves.object
                )
            );
    } catch (err) {
        logger.error(
            "productController getAll - Falha ao listar todas os produtos"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar todas os produtos")
            );
    }
};

const update = async (req, res) => {
    try {
        logger.info("Acessado PUT /product/:id");
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;

        const result = await productService.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("productController update - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao editar produto"));
    }
};

const remove = async (req, res) => {
    try {
        logger.info("Acessado DELETE /product/:id");
        const { id } = req.params;
        const result = await productService.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "Produto deletado com sucesso"));
    } catch (err) {
        logger.error("productController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover produto"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
}