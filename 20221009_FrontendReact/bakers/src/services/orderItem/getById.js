import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getByIdOrderPad = async (id) => {
    try {
        const response = await getRequest(
            endpoints.orderPadItems + "/" + id,
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
            quantity: response.object.quantity,
            valueUnitary: response.object.valueUnitary,
            orderPad: {
                id: response.object.orderPad.id,
                date: response.object.orderPad.date
            },
            product: {
                id: response.object.product.id,
                description: response.object.product.description,
                barCode: response.object.product.barCode,
                quantity: response.object.product.quantity,
                minQuantity: response.object.product.minQuantity,
                valueUnitary: response.object.product.valueUnitary,
                unitOfMeasurement: {
                    id: response.object.unitOfMeasurement.id,
                    description: response.object.unitOfMeasurement.description
                },
                category: {
                    id: response.object.category.id,
                    description: response.object.category.description
                }
            }
        }
    } catch (err) {
        message.error("Falha ao buscar item de comanda por id no banco");
        return null;
    }
};
