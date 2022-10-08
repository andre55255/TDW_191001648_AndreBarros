const unitOfMeasService = require("../services/unitOfMeasurementService");
const { logger } = require("../middlewares/logger");
const { buildApiResponse } = require("../helpers/staticMethods");

const create = async (req, res) => {
    try {
        logger.info("Acessado POST /unitOfMeasurement");
        const model = req.body;

        const result = await unitOfMeasService.create(model);
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
        logger.error("unitOfMeasurementController create - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao criar Unidade de medida"));
    }
};

const getById = async (req, res) => {
    try {
        logger.info("Acessado GET /unitOfMeasurement/:id");
        const { id } = req.params;

        const modelSave = await unitOfMeasService.getById(id);
        if (!modelSave || !modelSave.success) {
            logger.error(
                "unitOfMeasurementController getById - Unidade de medida não encontrada: " + id
            );
            return res
                .status(404)
                .json(buildApiResponse(false, 404, "Unidade de medida não encontrada"));
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Unidade de medida listada com sucesso",
                    modelSave.object
                )
            );
    } catch (err) {
        logger.error(
            "unitOfMeasurementController getById - Falha ao listar Unidade de medida por id"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar Unidade de medida por id")
            );
    }
};

const getAll = async (req, res) => {
    try {
        logger.info("Acessado GET /unitOfMeasurement");
        const modelsSaves = await unitOfMeasService.getAll();
        if (!modelsSaves) {
            logger.error(
                "unitOfMeasurementController getAll - Unidade de medidas não encontradas"
            );
            return res
                .status(404)
                .json(
                    buildApiResponse(false, 404, "Unidade de medidas não encontradas")
                );
        }
        return res
            .status(200)
            .json(
                buildApiResponse(
                    true,
                    200,
                    "Unidade de medidas listadas com sucesso",
                    modelsSaves.object
                )
            );
    } catch (err) {
        logger.error(
            "unitOfMeasurementController getAll - Falha ao listar todas as unidades de medida"
        );
        return res
            .status(500)
            .json(
                buildApiResponse(false, 500, "Falha ao listar todas as unidades de medida")
            );
    }
};

const update = async (req, res) => {
    try {
        logger.info("Acessado PUT /unitOfMeasurement/:id");
        const { id } = req.params;
        const modelSave = req.body;
        modelSave.id = id;

        const result = await unitOfMeasService.update(modelSave);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res
            .status(200)
            .json(buildApiResponse(true, 200, result.message, result.object));
    } catch (err) {
        logger.error("unitOfMeasurementController update - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao editar Unidade de medida"));
    }
};

const remove = async (req, res) => {
    try {
        logger.info("Acessado DELETE /unitOfMeasurement/:id");
        const { id } = req.params;
        const result = await unitOfMeasService.remove(id);
        if (!result || !result.success) {
            return res
                .status(400)
                .json(buildApiResponse(false, 400, result.message));
        }
        return res.status(200).json(buildApiResponse(true, 200, "Unidade de medida deletada com sucesso"));
    } catch (err) {
        logger.error("unitOfMeasurementController remove - Exceção: " + err);
        return res
            .status(500)
            .json(buildApiResponse(false, 500, "Falha ao remover Unidade de medida"));
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove
}