import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import { nameCookieAccessToken, nameCookieExpiresToken } from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getUserInfo = async () => {
    try {
        const response = await getRequest(endpoints.userInfo, buildAuthorization());
        console.log(response);
        if (!response.success) {
            if (response.status === 401) {
                message.error(response.message);
                removeLocalStorage(nameCookieAccessToken);
                removeLocalStorage(nameCookieExpiresToken);
                return {
                    unauthorized: true
                };
            }
            message.error(response.message);
            return null;
        }
        return {
            id: response.object.id,
            login: response.object.login,
            name: response.object.name,
            status: response.object.status,
            roleId: response.object.roleId,
            roleName: response.object.roleName,
            unauthorized: false
        };
    } catch (err) {
        message.error("Falha ao buscar informações de usuário");
        return null;
    }
}