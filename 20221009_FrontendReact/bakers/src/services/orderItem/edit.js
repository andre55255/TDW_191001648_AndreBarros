import { hasErrorsValidationYup } from "../../helpers/getErrorValidationYup";
import { endpoints } from "../../helpers/endPointsName";
import { putRequest } from "../api/put";
import { message } from "antd";
import { buildAuthorization } from "../../helpers/methods";

export const editOrderPadItem = async (errors, values, idItem, idOrderPad) => {
    try {
        const hasErrors = hasErrorsValidationYup(errors);
        if (hasErrors) {
            return null;
        }
        values.orderPadId = idOrderPad;
        const response = await putRequest(endpoints.orderPadItems + "/" + idItem, values, buildAuthorization());
        if (!response.success) {
            message.error(response.message);
            return null;
        }
        return response.message;
    } catch (err) {
        message.error("Falha inesperada ao editar item de comanda");
        return null;
    }
};
