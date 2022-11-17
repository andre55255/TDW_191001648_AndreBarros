import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getByIdUser = async (id) => {
    try {
        const response = await getRequest(
            endpoints.user + "/" + id,
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
        if (!response.object) {
            return null;
        }

        return {
            id: response.object.id,
            login: response.object.login,
            name: response.object.name,
            status: response.object.status,
            roleId: response.object.roleId,
            roleName: response.object.roleName,
        };
    } catch (err) {
        message.error("Falha ao buscar usuário por id no banco");
        return null;
    }
};
