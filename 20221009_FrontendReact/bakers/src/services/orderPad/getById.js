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
            endpoints.orderPad + "/" + id,
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
            date: response.object.date,
            items: response.object.items.map((item) => {
                return {
                    id: item.id,
                    valueUnitary: item.valueUnitary,
                    product: {
                        id: item.product.id,
                        description: item.product.description,
                        barCode: item.product.barCode,
                        quantity: item.product.quantity,
                        minQuantity: item.product.minQuantity,
                        valueUnitary: item.product.valueUnitary,
                        categoryId: item.product.category.id,
                        category: {
                            id: item.product.category.id,
                            description: item.product.category.description,
                        },
                        unitOfMeasurementId: item.product.unitOfMeasurement.id,
                        unitOfMeasurement: {
                            id: item.product.unitOfMeasurement.id,
                            description:
                                item.product.unitOfMeasurement.description,
                        },
                    },
                };
            }),
        };
    } catch (err) {
        message.error("Falha ao buscar comanda por id no banco");
        return null;
    }
};
