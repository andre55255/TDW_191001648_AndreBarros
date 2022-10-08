const { check } = require("express-validator");

const validationProduct = [
    check("description")
        .notEmpty()
        .withMessage("Descrição não informada")
        .isString()
        .withMessage("Descrição inválida")
        .isLength({ min: 3, max: 30 })
        .withMessage("Descrição deve ter entre 3 e 30 caracteres"),
    check("barCode")
        .notEmpty()
        .withMessage("Código de barras não informado")
        .isString()
        .withMessage("Código de barras inválido")
        .isLength({ min: 3, max: 11 })
        .withMessage("Código de barras deve ter entre 3 e 30 caracteres"),
    check("quantity")
        .notEmpty()
        .withMessage("Quantidade não informada")
        .isFloat({ min: 0 })
        .withMessage("Quantidade não pode ser negativa"),
    check("minQuantity")
        .notEmpty()
        .withMessage("Quantidade mínima não informada")
        .isFloat({ min: 0 })
        .withMessage("Quantidade mínima não pode ser negativa"),
    check("valueUnitary")
        .notEmpty()
        .withMessage("Valor unitário não informado")
        .isFloat({ min: 0 })
        .withMessage("Valor unitário deve ser maior que zero"),
    check("idUnitOfMeasurement")
        .notEmpty()
        .withMessage("Unidade de medida não informada")
        .isInt({ min: 1 })
        .withMessage("Unidade de medida informada inválida"),
    check("idCategory")
        .notEmpty()
        .withMessage("Categoria não informada")
        .isInt({ min: 1 })
        .withMessage("Categoria informada inválida"),
];

module.exports = { validationProduct };
