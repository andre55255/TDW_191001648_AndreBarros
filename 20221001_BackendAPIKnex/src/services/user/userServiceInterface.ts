import { LoginVO } from "../../viewObjects/user/LoginVO";
import { ResultVO } from "../../viewObjects/utils/ResultVO";

export interface UserServiceInterface {
    login(loginVO: LoginVO) : Promise<ResultVO>;
}