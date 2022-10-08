const { check } = require("express-validator");
const moment = require("moment");

const validationOrderPad = [
    check("date")
        .notEmpty()
        .withMessage("Data da comanda não informada")
        .isDate()
        .withMessage("Data da comanda inválida")
        .custom((val) => {
            if (moment(val).toDate() > new Date()) {
                return false;
            }
            return true;
        })
        .withMessage("Data da comanda não pode ser maior que a data atual")
];

module.exports = { validationOrderPad };
