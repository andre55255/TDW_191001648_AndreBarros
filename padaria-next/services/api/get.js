import api from "./configApi";

export const getRequest = async (path, authorization = {}) => {
    let response = {
        success: false,
        message: "",
        object: {},
        status: 0
    };
    try {
        await api
            .get(path, authorization)
            .then((result) => {
                response.success = result.data.sucesso;
                response.message = result.data.message;
                response.object = result.data.objeto;
                response.status = result.status;
            })
            .catch(async (err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            response.message = err.response.data.message;
                            response.status = 400;
                            break;
                        case 401:
                            response.message = "Acesso negado";
                            response.status = 401;
                            break;
                        case 409:
                            response.message = err.response.data.message;
                            response.status = 409;
                            break;
                        case 500:
                            response.message = err.response.data.message;
                            response.status = 500;
                            break;
                        default:
                            response.message = "Falha inesperada";
                            response.status = err.response.status;
                    }
                } else {
                    response.message =
                        "Ops, falha inesperada em nosso sistema. Desculpe-nos pelo transtorno";
                    response.status = 500;
                }
            });
        return response;
    } catch (err) {
        response.success = false;
        response.message = "Ops, falha inesperada em nosso sistema. Desculpe-nos pelo transtorno";
        response.status = 500;
        return response;
    }
};