import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getByIdMovement = async (id) => {
    try {
        const response = await getRequest(
            endpoints.movement + "/" + id,
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
            description: response.object.description,
            type: response.object.type,
            date: response.object.date,
            totalValue: response.object.totalValue,
            userName: response.object.user.name,
        };
    } catch (err) {
        message.error("Falha ao buscar movimento por id no banco");
        return null;
    }
};
