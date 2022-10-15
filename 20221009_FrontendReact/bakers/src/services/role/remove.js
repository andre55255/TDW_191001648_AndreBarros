import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { deleteRequest } from "../api/remove";
import { message } from "antd";

export const removeRole = async (id) => {
    try {
        const response = await deleteRequest(
            endpoints.role + "/" + id,
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
        message.error("Falha ao remover perfis no banco");
        return null;
    }
};
