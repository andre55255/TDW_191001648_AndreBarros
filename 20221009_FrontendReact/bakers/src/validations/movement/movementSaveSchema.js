import * as yup from "yup";

const schema = yup.object().shape({
    description: yup
        .string()
        .required("Nome não informado")
        .min(3, "Nome deve ter pelo menos 3 caracteres")
        .max(20, "Nome deve ter no máximo 20 caracteres"),
    date: yup
        .date()
        .required("Data de movimento não informada"),
    value: yup
        .number()
        .required("Valor não informado")
});

export const yupRuleValidator = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
