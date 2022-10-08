const { check } = require("express-validator");

const validationOrderPadItem = [
    check("quantity")
        .notEmpty()
        .withMessage("Quantidade não informada")
        .isInt({ min: 1 })
        .withMessage("Quantidade deve ser maior que zero"),
    check("orderPadId")
        .notEmpty()
        .withMessage("Comanda não informada")
        .isInt({ min: 1 })
        .withMessage("Comanda informada inválida"),
    check("productId")
        .notEmpty()
        .withMessage("Produto não informado")
        .isInt({ min: 1 })
        .withMessage("Produto informado inválido")
];

module.exports = { validationOrderPadItem };
