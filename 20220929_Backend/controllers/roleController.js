const roleModel = require("../models/roleModel");
const { buildResponse } = require("../helpers/staticMethods");

const getAll = (req, res) => {
    try {
        const db = roleModel.getAll();

        return res
            .status(200)
            .json(
                buildResponse(true, "Perfis listados com sucesso", db)
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar todos os perfis: " + err.message
                )
            );
    }
};

const getById = (req, res) => {
    try {
        const { id } = req.params;

        const model = roleModel.getById(id);

        if (model) {
            return res
                .status(200)
                .json(
                    buildResponse(true, "Perfil listado com sucesso", model[0])
                );
        }

        return res
            .status(404)
            .json(buildResponse(true, "Perfil não encontrada"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar perfil por id: " + err.message
                )
            );
    }
};

const create = (req, res) => {
    try {
        const model = req.body;

        const resultCreated = roleModel.create(model);

        if (resultCreated) {
            return res
                .status(201)
                .json(
                    buildResponse(
                        true,
                        "Perfil criado com sucesso",
                        resultCreated
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao inserir perfil"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao criar perfil: " + err.message)
            );
    }
};

const edit = (req, res) => {
    try {
        const { id } = req.params;
        const model = req.body;
        model.id = id;

        const modelExist = roleModel.getById(id);
        if (!modelExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Perfil não encontrado"));
        }

        const modelEdited = roleModel.edit(model);

        if (modelEdited) {
            return res
                .status(200)
                .json(
                    buildResponse(
                        true,
                        "Perfil editado com sucesso",
                        modelEdited
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao editar perfil"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao editar perfil: " + err.message)
            );
    }
};

const remove = (req, res) => {
    try {
        const { id } = req.params;

        const modelExist = roleModel.getById(id);
        if (!modelExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Perfil não encontrado"));
        }

        const modelDelete = roleModel.remove(id);

        if (modelDelete) {
            res.status(200).json(
                buildResponse(true, "Perfil deletado com sucesso")
            );
        }

        res.status(400).json(buildResponse(false, "Falha ao deletar perfil"));
    } catch (err) {
        res.status(500).json(
            buildResponse(false, "Falha ao deletar perfil: " + err.message)
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
