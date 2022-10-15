import * as yup from "yup";

const schema = yup.object().shape({
    description: yup
        .string()
        .required("Descrição não informada")
        .min(3, "Descrição deve ter pelo menos 3 caracteres")
        .max(30, "Descrição deve ter no máximo 30 caracteres"),
    barCode: yup
        .string()
        .required("Código de barras não informado")
        .min(3, "Código de barras deve ter pelo menos 3 caracteres")
        .max(11, "Código de barras deve ter no máximo 11 caracteres"),
    quantity: yup
        .number()
        .required("Quantidade não informada")
        .min(0, "Quantidade não pode ser negativa"),
    minQuantity: yup
        .number()
        .required("Quantidade mínima não informada")
        .min(0, "Quantidade mínima não pode ser negativa"),
    valueUnitary: yup
        .number()
        .required("Valor unitário não informado")
        .min(0, "Valor unitário não pode ser negativo"),
    idUnitOfMeasurement: yup
        .number()
        .required("Unidade de medida não informada")
        .min(1, "Unidade de medida não selecionada"),
    idCategory: yup
        .number()
        .required("Categoria não informada")
        .min(1, "Categoria não selecionada"),
});

export const yupRuleValidator = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
