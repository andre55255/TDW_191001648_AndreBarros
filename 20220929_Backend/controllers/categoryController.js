const categoryModel = require("../models/categoryModel");
const { buildResponse } = require("../helpers/staticMethods");

const getAll = (req, res) => {
    try {
        const db = categoryModel.getAll();

        return res
            .status(200)
            .json(
                buildResponse(true, "Categorias listadas com sucesso", db)
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar todos as categorias: " + err.message
                )
            );
    }
};

const getById = (req, res) => {
    try {
        const { id } = req.params;

        const model = categoryModel.getById(id);

        if (model) {
            return res
                .status(200)
                .json(
                    buildResponse(true, "Categoria listada com sucesso", model[0])
                );
        }

        return res
            .status(404)
            .json(buildResponse(true, "Categoria não encontrada"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar categoria por id: " + err.message
                )
            );
    }
};

const create = (req, res) => {
    try {
        const model = req.body;

        const resultCreated = categoryModel.create(model);

        if (resultCreated) {
            return res
                .status(201)
                .json(
                    buildResponse(
                        true,
                        "Categoria criada com sucesso",
                        resultCreated
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao inserir categoria"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao criar categoria: " + err.message)
            );
    }
};

const edit = (req, res) => {
    try {
        const { id } = req.params;
        const model = req.body;
        model.id = id;

        const modelExist = categoryModel.getById(id);
        if (!modelExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Categoria não encontrada"));
        }

        const modelEdited = categoryModel.edit(model);

        if (modelEdited) {
            return res
                .status(200)
                .json(
                    buildResponse(
                        true,
                        "Categoria editada com sucesso",
                        modelEdited
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao editar categoria"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao editar categoria: " + err.message)
            );
    }
};

const remove = (req, res) => {
    try {
        const { id } = req.params;

        const modelExist = categoryModel.getById(id);
        if (!modelExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Categoria não encontrada"));
        }

        const modelDelete = categoryModel.remove(id);

        if (modelDelete) {
            res.status(200).json(
                buildResponse(true, "Categoria deletada com sucesso")
            );
        }

        res.status(400).json(buildResponse(false, "Falha ao deletar categoria"));
    } catch (err) {
        res.status(500).json(
            buildResponse(false, "Falha ao deletar categoria: " + err.message)
        );
    }
};

module.exports = {
    getAll,
    getById,
    create,
    edit,
    remove,
};
