import * as yup from "yup";

const schema = yup.object().shape({
    login: yup
        .string()
        .required("Login não informado")
        .min(3, "Login deve ter pelo menos 3 caracteres")
        .max(20, "Login deve ter no máximo 20 caracteres"),
    password: yup
        .string()
        .required("Senha não informada")
        .min(3, "Senha deve ter pelo menos 3 caracteres")
        .max(20, "Senha deve ter no máximo 20 caracteres"),
});

export const yupRuleValidator = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
