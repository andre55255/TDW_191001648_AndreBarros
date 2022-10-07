const { check } = require("express-validator");

const validationId = [
    check("id")
        .notEmpty()
        .withMessage("Id não informado na requisição")
        .isInt({ min: 1 })
        .withMessage("Id não informado na requisição"),
];

module.exports = { validationId };
