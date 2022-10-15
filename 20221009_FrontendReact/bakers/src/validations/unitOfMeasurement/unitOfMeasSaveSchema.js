import * as yup from "yup";

const schema = yup.object().shape({
    description: yup
        .string()
        .required("Descrição não informada")
        .min(3, "Descrição deve ter pelo menos 3 caracteres")
        .max(30, "Descrição deve ter no máximo 30 caracteres"),
});

export const yupRuleValidator = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
