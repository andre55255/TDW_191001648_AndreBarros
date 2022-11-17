import { getRequest } from "../api/get";

export const getAllUsers = async () => {
    try {
        const response = await getRequest("/usuario");
        if (!response.success) {
            return null;
        }
        if (response.object.length <= 0) {
            return [];
        }
        return response.object.map((user) => {
            return {
                id: user.IDUsuario,
                login: user.Login,
                name: user.Nome,
                status: user.Status,
                roleId: user.IDPerfil
            };
        });
    } catch (err) {
        message.error("Falha ao buscar usuários no banco");
        return null;
    }
};
