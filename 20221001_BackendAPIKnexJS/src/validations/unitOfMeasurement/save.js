const { check } = require("express-validator");

const validationUnitOfMeasurement = [
    check("description")
        .notEmpty()
        .withMessage("Descrição não informada")
        .isString()
        .withMessage("Descrição inválida")
        .isLength({ min: 3, max: 30 }),
];

module.exports = { validationUnitOfMeasurement };
