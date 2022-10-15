import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { deleteRequest } from "../api/remove";
import { message } from "antd";

export const removeUnitOfMeasurement = async (id) => {
    try {
        const response = await deleteRequest(
            endpoints.unitOfMeasurement + "/" + id,
            buildAuthorization()
        );
        if (!response.success) {
            if (response.status === 401) {
                message.error(response.message);
                removeLocalStorage(nameCookieAccessToken);
                removeLocalStorage(nameCookieExpiresToken);
                return {
                    unauthorized: true,
                };
            }
            message.error(response.message);
            return null;
        }
        return response.message;
    } catch (err) {
        message.error("Falha ao remover unidade de medida no banco");
        return null;
    }
};
