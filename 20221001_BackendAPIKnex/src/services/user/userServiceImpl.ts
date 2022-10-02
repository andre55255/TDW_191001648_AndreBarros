import { UserRepositoryInterface } from './../../repostories/user/userRepositoryInterface';
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { LoginVO } from "../../viewObjects/user/LoginVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";
import { UserServiceInterface } from "./userServiceInterface";
import { UserRepositoryImpl } from '../../repostories/user/userRepositoryImpl';
import { compare } from 'bcrypt';
import { DecodedVO } from '../../viewObjects/utils/DecodedVO';
import { sign } from 'jsonwebtoken';
import { auth } from '../../helpers/constants';

export class UserServiceImpl implements UserServiceInterface {

    private _userRepo: UserRepositoryInterface;

    constructor() {
        this._userRepo = new UserRepositoryImpl();
    }

    public async login(loginVO: LoginVO): Promise<ResultVO> {
        try {
            const userSave = await this._userRepo.getByLogin(loginVO.login);
            if (!userSave) {
                logger.warn("UserService login - Usuário não encontrado: " + loginVO.login);
                return buildResult(false, "Usuário não encontrado");
            }

            const resultVerifyPass = await compare(loginVO.password, userSave.password);
            if (!resultVerifyPass) {
                logger.warn("UserService login - Senha incorreta: " + loginVO.login);
                return buildResult(false, "Senha não confere");
            }

            const payloadJwt: DecodedVO = {
                idUser: userSave.id,
                loginUser: userSave.login,
                roleId: userSave.roleId,
                roleName: userSave.roleName   
            };

            const tokenJwt = sign(payloadJwt, auth.secret, {
                expiresIn: auth.expires,
                issuer: auth.issuer,
                audience: auth.audience
            });

            return buildResult(true, "Login efetuado com sucesso", {
                user: userSave.name,
                accessToken: tokenJwt
            });
        } catch (err: any) {
            logger.error("UserService login - Exceção: " + err);
            return buildResult(false, "Falha inesperada ao realizar login");
        }
    }
}