const { check } = require("express-validator");
const moment = require("moment");

const validationOrderPad = [
    check("date")
        .notEmpty()
        .withMessage("Data da comanda não informada")
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
        .withMessage("Data da comanda não pode ser maior que a data atual")
];

const validationOrderPadWithItems = [
    check("items")
        .notEmpty()
        .withMessage("Itens não informados")
        .isArray({ min: 1 })
        .withMessage("Informe os itens corretamente")
];

module.exports = { validationOrderPad, validationOrderPadWithItems };
