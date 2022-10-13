import { hasErrorsValidationYup } from "../../helpers/getErrorValidationYup";
import { endpoints } from "../../helpers/endPointsName";
import { postRequest } from "../api/post";
import { message } from "antd";

export const signIn = async (errors, values) => {
    try {
        const hasErrors = hasErrorsValidationYup(errors);
        if (hasErrors) {
            return null;
        }
        const response = await postRequest(endpoints.login, values);
        if (!response.success) {
            message.error(response.message);
            return null;
        }
        return {
            user: response.object.user,
            accessToken: response.object.accessToken,
            expiresIn: response.object.expiresIn
        };
    } catch (err) {
        message.error("Falha inesperada ao realizar login");
        return null;
    }
};
