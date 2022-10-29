import * as yup from "yup";

const schema = yup.object().shape({
    quantity: yup
        .number()
        .required("Quantidade não informada")
        .min(0, "Quantidade não pode ser negativa"),
    productId: yup
        .number()
        .required("Produto não informado")
        .min(1, "Produto não pode ser negativo"),
    orderPadId: yup
        .number()
        .required("Comanda não informada")
        .min(1, "Comanda não selecionada"),
});

export const yupRuleValidator = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
