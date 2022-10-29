import { endpoints } from "../../helpers/endPointsName";
import { buildAuthorization } from "../../helpers/methods";
import { removeLocalStorage } from "../../helpers/methods";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { getRequest } from "../api/get";
import { message } from "antd";

export const getAllOrderPadItems = async () => {
    try {
        const response = await getRequest(
            endpoints.orderPadItems,
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
        if (response.object.length <= 0) {
            return [];
        }
        return response.object.map((model) => {
            return {
                id: model.id,
                quantity: model.quantity,
                valueUnitary: model.valueUnitary,
                orderPad: {
                    id: model.orderPad.id,
                    date: model.orderPad.date
                },
                product: {
                    id: model.product.id,
                    description: model.product.description,
                    barCode: model.product.barCode,
                    quantity: model.product.quantity,
                    minQuantity: model.product.minQuantity,
                    valueUnitary: model.product.valueUnitary,
                    unitOfMeasurement: {
                        id: model.unitOfMeasurement.id,
                        description: model.unitOfMeasurement.description
                    },
                    category: {
                        id: model.category.id,
                        description: model.category.description
                    }
                }
            }
        });
    } catch (err) {
        message.error("Falha ao buscar itens de comanda no banco");
        return null;
    }
};
