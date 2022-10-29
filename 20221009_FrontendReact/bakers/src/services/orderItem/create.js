import { hasErrorsValidationYup } from "../../helpers/getErrorValidationYup";
import { endpoints } from "../../helpers/endPointsName";
import { postRequest } from "../api/post";
import { message } from "antd";
import { buildAuthorization } from "../../helpers/methods";

export const createOrderPadItem = async (errors, values, idOrderPad) => {
    try {
        const hasErrors = hasErrorsValidationYup(errors);
        if (hasErrors) {
            return null;
        }
        values.orderPadId = idOrderPad;
        const response = await postRequest(endpoints.orderPadItems, values, buildAuthorization());
        if (!response.success) {
            message.error(response.message);
            return null;
        }
        return response.message;
    } catch (err) {
        message.error("Falha inesperada ao criar item de comanda");
        return null;
    }
};
