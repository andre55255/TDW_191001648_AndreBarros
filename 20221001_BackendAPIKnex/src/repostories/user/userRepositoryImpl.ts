import { db } from "../../domain/database";
import logger from "../../middlewares/logger";
import { UserVO } from "../../viewObjects/user/UserVO";
import { UserRepositoryInterface } from "./userRepositoryInterface";

export class UserRepositoryImpl implements UserRepositoryInterface {
    public async getByLogin(login: String): Promise<UserVO | null> {
        try {
            const userSave = await db
                .select([
                    "TB_Usuario.IDUsuario as id",
                    "TB_Usuario.Login as login",
                    "TB_Usuario.Nome as name",
                    "TB_Usuario.Senha as password",
                    "TB_Usuario.Status as status",
                    "TB_Usuario.IDPerfil as roleId",
                    "TB_Perfil.Descricao as roleName",
                ])
                .table("TB_Usuario")
                .innerJoin(
                    "TB_Perfil",
                    "TB_Perfil.IDPerfil",
                    "TB_Usuario.IDPerfil"
                )
                .where("TB_Usuario.Login", login);

            if (userSave == null || userSave.length <= 0) {
                throw new Error("User not found, login: " + login);
            }

            const response: UserVO = userSave[0] as UserVO;

            return response;
        } catch (err: any) {
            logger.error("UserRepository getByEmail - Exceção: " + err);
            return null;
        }
    }
}
