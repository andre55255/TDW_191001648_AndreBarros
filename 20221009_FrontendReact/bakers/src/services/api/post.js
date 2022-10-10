import api from "./configApi";

export const postRequest = async (path, body, authorization = {}) => {
    let response = {
        success: false,
        message: "",
        object: {},
    };
    try {
        await api
            .post(path, body)
            .then((result) => {
                response.success = result.data.success;
                response.message = result.data.message;
                response.object = result.data.object;
            })
            .catch(async (err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            response.message = err.response.data.message;
                            break;
                        case 401:
                            response.message = "Acesso negado";
                            break;
                        case 500:
                            response.message = err.response.data.message;
                            break;
                        default:
                            response.message = "Falha inesperada";
                    }
                } else {
                    response.message =
                        "Ops, falha inesperada em nosso sistema. Desculpe-nos pelo transtorno";
                }
            });
        return response;
    } catch (err) {
        response.success = false;
        response.message = "Ops, falha inesperada em nosso sistema. Desculpe-nos pelo transtorno";
    }
};