const userModel = require("../models/userModel");
const roleModel = require("../models/roleModel");
const { buildResponse } = require("../helpers/staticMethods");

const getAll = (req, res) => {
    try {
        const db = userModel.getAll();

        return res
            .status(200)
            .json(buildResponse(true, "Usuários listados com sucesso", db));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar todos os usuários: " + err.message
                )
            );
    }
};

const getById = (req, res) => {
    try {
        const { id } = req.params;

        const model = userModel.getById(id);

        if (model) {
            return res
                .status(200)
                .json(
                    buildResponse(true, "Usuário listado com sucesso", model[0])
                );
        }

        return res
            .status(404)
            .json(buildResponse(true, "Usuário não encontrado"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar usuário por id: " + err.message
                )
            );
    }
};

const create = (req, res) => {
    try {
        const model = req.body;

        const roleExist = roleModel.getById(model.roleId);
        if (!roleExist || !roleExist.length) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Não existe nenhum perfil para o id informado (roleId)"
                    )
                );
        }
        model.role = roleExist[0];

        const resultCreated = userModel.create(model);

        if (resultCreated) {
            return res
                .status(201)
                .json(
                    buildResponse(
                        true,
                        "Usuário criado com sucesso",
                        resultCreated
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao inserir usuário"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao criar usuário: " + err.message)
            );
    }
};

const edit = (req, res) => {
    try {
        const { id } = req.params;
        const model = req.body;
        model.id = id;

        const modelExist = userModel.getById(id);
        if (!modelExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Usuário não encontrado"));
        }

        const roleExist = roleModel.getById(model.roleId);
        if (!roleExist || !roleExist.length) {
            return res
                .status(400)
                .json(
                    buildResponse(
                        false,
                        "Não existe nenhum perfil para o id informado (roleId)"
                    )
                );
        }
        model.role = roleExist[0];

        const modelEdited = userModel.edit(model);

        if (modelEdited) {
            return res
                .status(200)
                .json(
                    buildResponse(
                        true,
                        "Usuário editado com sucesso",
                        modelEdited
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao editar usuário"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao editar usuário: " + err.message)
            );
    }
};

const remove = (req, res) => {
    try {
        const { id } = req.params;

        const modelExist = userModel.getById(id);
        if (!modelExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Usuário não encontrado"));
        }

        const modelDelete = userModel.remove(id);

        if (modelDelete) {
            res.status(200).json(
                buildResponse(true, "Usuário deletado com sucesso")
            );
        }

        res.status(400).json(buildResponse(false, "Falha ao deletar usuário"));
    } catch (err) {
        res.status(500).json(
            buildResponse(false, "Falha ao deletar usuário: " + err.message)
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
