import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getAllUsers = async () => {
    try {
        const response = await getRequest(endpoints.user, buildAuthorization());
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
        if (response.object.length <= 0) {
            return [];
        }
        return response.object.map((user) => {
            return {
                id: user.id,
                login: user.login,
                name: user.name,
                status: user.status,
                roleId: user.roleId,
                roleName: user.roleName,
            };
        });
    } catch (err) {
        message.error("Falha ao buscar usuários no banco");
        return null;
    }
};
