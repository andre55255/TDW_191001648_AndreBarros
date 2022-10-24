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
                        id: item.id,
                        description: item.description,
                        barCode: item.barCode,
                        quantity: item.quantity,
                        minQuantity: item.minQuantity,
                        valueUnitary: item.valueUnitary,
                        categoryId: item.category.id,
                        category: {
                            id: item.category.id,
                            description:
                                item.category.description,
                        },
                        unitOfMeasurementId:
                            item.unitOfMeasurement.id,
                        unitOfMeasurement: {
                            id: item.unitOfMeasurement.id,
                            description:
                                item.unitOfMeasurement
                                    .description,
                        },
                    },
                };
            }),
        };
    } catch (err) {
        message.error("Falha ao buscar movimento por id no banco");
        return null;
    }
};
