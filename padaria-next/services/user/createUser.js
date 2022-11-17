import { hasErrorsValidationYup } from "../../helpers/getErrorValidationYup";
import { endpoints } from "../../helpers/endPointsName";
import { postRequest } from "../api/post";
import { message } from "antd";
import { buildAuthorization } from "../../helpers/methods";

export const createUser = async (errors, values) => {
    try {
        const hasErrors = hasErrorsValidationYup(errors);
        if (hasErrors) {
            return null;
        }
        if (values.password !== values.confirmPassword) {
            message.error("Senhas não conferem");
            return null;
        }
        const response = await postRequest(endpoints.user, values, buildAuthorization());
        if (!response.success) {
            message.error(response.message);
            return null;
        }
        return response.message;
    } catch (err) {
        message.error("Falha inesperada ao criar usuário");
        return null;
    }
};
