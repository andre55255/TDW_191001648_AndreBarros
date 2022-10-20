import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getAllMovements = async () => {
    try {
        const response = await getRequest(endpoints.movement, buildAuthorization());
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
        return response.object.map((model) => {
            return {
                id: model.id,
                description: model.description,
                type: model.type,
                date: model.date,
                totalValue: model.totalValue,
                userName: model.user.name
            };
        });
    } catch (err) {
        message.error("Falha ao buscar movimentos no banco");
        return null;
    }
};
