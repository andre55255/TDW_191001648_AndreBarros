import * as yup from "yup";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Nome não informado")
        .min(3, "Nome deve ter pelo menos 3 caracteres")
        .max(50, "Nome deve ter no máximo 50 caracteres"),
    login: yup
        .string()
        .required("Login não informado")
        .min(3, "Login deve ter pelo menos 3 caracteres")
        .max(20, "Login deve ter no máximo 20 caracteres"),
    password: yup
        .string()
        .required("Senha não informada")
        .min(3, "Senha deve ter pelo menos 3 caracteres")
        .max(10, "Senha deve ter no máximo 10 caracteres"),
    confirmPassword: yup
        .string()
        .required("Confirmação de senha não informada")
        .min(3, "Confirmação de Senha deve ter pelo menos 3 caracteres")
        .max(10, "Confirmação de Senha deve ter no máximo 10 caracteres"),
    roleId: yup
        .number()
        .required("Perfil não informado")
        .min(1, "Perfil não informado"),
});

export const yupRuleValidator = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
