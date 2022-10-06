const { check } = require("express-validator");

const validationSave = [
    check("name")
        .notEmpty()
        .withMessage("Nome não informado")
        .isString()
        .withMessage("Nome inválido")
        .isLength({ min: 3, max: 60 })
        .withMessage("Nome deve ter entre 3 e 60 caracteres"),
    check("login")
        .notEmpty()
        .withMessage("Login não informado")
        .isString()
        .withMessage("Login inválido")
        .isLength({ min: 3, max: 50 })
        .withMessage("Login deve ter entre 3 e 50 caracteres"),
    check("password")
        .notEmpty()
        .withMessage("Senha não informada")
        .isString()
        .withMessage("Senha inválida")
        .isLength({ min: 3, max: 10 })
        .withMessage("Senha deve ter entre 3 e 10 caracteres"),
    check("roleId")
        .notEmpty()
        .withMessage("Perfil não informado")
        .isInt({ min: 1 })
        .withMessage("Perfil inválido")
]

module.exports = { validationSave };