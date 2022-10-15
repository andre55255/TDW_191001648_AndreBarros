import { hasErrorsValidationYup } from "../../helpers/getErrorValidationYup";
import { endpoints } from "../../helpers/endPointsName";
import { putRequest } from "../api/put";
import { message } from "antd";
import { buildAuthorization } from "../../helpers/methods";

export const editProduct = async (errors, values, idUser) => {
    try {
        const hasErrors = hasErrorsValidationYup(errors);
        if (hasErrors) {
            return null;
        }
        const response = await putRequest(endpoints.product + "/" + idUser, values, buildAuthorization());
        if (!response.success) {
            message.error(response.message);
            return null;
        }
        return response.message;
    } catch (err) {
        message.error("Falha inesperada ao editar produto");
        return null;
    }
};
