import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getByIdProduct = async (id) => {
    try {
        const response = await getRequest(
            endpoints.product + "/" + id,
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
            barCode: response.object.barCode,
            quantity: response.object.quantity,
            minQuantity: response.object.minQuantity,
            valueUnitary: response.object.valueUnitary,
            categoryId: response.object.category.id,
            category: {
                id: response.object.category.id,
                description: response.object.category.description,
            },
            unitOfMeasurementId: response.object.unitOfMeasurement.id,
            unitOfMeasurement: {
                id: response.object.unitOfMeasurement.id,
                description: response.object.unitOfMeasurement.description,
            },
        };
    } catch (err) {
        message.error("Falha ao buscar produto por id no banco");
        return null;
    }
};
