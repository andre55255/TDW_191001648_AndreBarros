const productModel = require("../models/productModel");
const { buildResponse } = require("../helpers/staticMethods");

const getAll = (req, res) => {
    try {
        const dbProducts = productModel.getAll();

        return res
            .status(200)
            .json(
                buildResponse(true, "Produtos listados com sucesso", dbProducts)
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar todos os produtos: " + err.message
                )
            );
    }
};

const getById = (req, res) => {
    try {
        const { id } = req.params;

        const product = productModel.getById(id);

        if (product) {
            return res
                .status(200)
                .json(
                    buildResponse(true, "Produto listado com sucesso", product)
                );
        }

        return res
            .status(404)
            .json(buildResponse(true, "Produto não encontrado"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(
                    false,
                    "Falha ao buscar produto por id: " + err.message
                )
            );
    }
};

const create = (req, res) => {
    try {
        const product = req.body;

        const resultCreated = productModel.create(product);

        if (resultCreated) {
            return res
                .status(201)
                .json(
                    buildResponse(
                        true,
                        "Produto criado com sucesso",
                        resultCreated
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao inserir produto"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao criar produto: " + err.message)
            );
    }
};

const edit = (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        product.id = id;

        const prodExist = productModel.getById(id);
        if (!prodExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Produto não encontrado"));
        }

        const productEdited = productModel.edit(product);

        if (productEdited) {
            return res
                .status(200)
                .json(
                    buildResponse(
                        true,
                        "Produto editado com sucesso",
                        productEdited
                    )
                );
        }

        return res
            .status(400)
            .json(buildResponse(false, "Falha ao editar produto"));
    } catch (err) {
        return res
            .status(500)
            .json(
                buildResponse(false, "Falha ao editar produto: " + err.message)
            );
    }
};

const remove = (req, res) => {
    try {
        const { id } = req.params;

        const productExist = productModel.getById(id);
        if (!productExist) {
            return res
                .status(400)
                .json(buildResponse(false, "Produto não encontrado"));
        }

        const productDelete = productModel.remove(id);

        if (productDelete) {
            res.status(200).json(
                buildResponse(true, "Produto deletado com sucesso")
            );
        }

        res.status(400).json(buildResponse(false, "Falha ao deletar produto"));
    } catch (err) {
        res.status(500).json(
            buildResponse(false, "Falha ao deletar produto: " + err.message)
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
