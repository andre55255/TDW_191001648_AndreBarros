const { check } = require("express-validator");
const moment = require("moment");

const validationMovement = [
    check("description")
        .notEmpty()
        .withMessage("Descrição não informada")
        .isString()
        .withMessage("Descrição inválida")
        .isLength({ min: 3, max: 20 })
        .withMessage("Descrição deve ter entre 3 e 20 caracteres"),
    check("date")
        .notEmpty()
        .withMessage("Data de movimento não informada")
        .custom((val) => {
            const date = moment(val);
            return date.isValid();
        })
        .withMessage("Data inválida")
        .custom((val) => {
            if (moment(val).toDate() > new Date()) {
                return false;
            }
            return true;
        })
        .withMessage("Data de movimento inválida ou não pode ser maior que a atual"),
    check("value")
        .notEmpty()
        .withMessage("Valor de movimento não informado")
        .isFloat()
        .withMessage("Valor inválido")
        .custom((val) => {
            if (val == 0) {
                return false;
            }
            return true;
        })
        .withMessage("Valor não pode ser zero")
];

module.exports = { validationMovement };
