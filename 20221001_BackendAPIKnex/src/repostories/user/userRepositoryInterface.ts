import { UserVO } from "../../viewObjects/user/UserVO";

export interface UserRepositoryInterface {
    getByLogin(email: String): Promise<UserVO | null>;
}