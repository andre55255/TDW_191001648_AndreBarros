import * as yup from "yup";

const schema = yup.object().shape({
    date: yup.date().required("Data de movimento não informada"),
});

export const yupRuleValidator = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
