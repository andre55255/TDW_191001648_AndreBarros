import { nameCookieAccessToken } from "./constants";
import { getLocalStorage, removeLocalStorage } from "./methods";
import { decode } from "jsonwebtoken";

export const verifyLogged = () => {
    try {
        const issJwt = process.env.REACT_APP_JWT_ISSUER || "";
        const audJwt = process.env.REACT_APP_JWT_AUDIENCE || "";
    
        let loginValid = false;
    
        const token = getLocalStorage(nameCookieAccessToken);
        const decoded = decode(token);
        
        if (decoded && decoded.iss === issJwt && decoded.aud === audJwt) {
            loginValid = true;
        } else {
            removeLocalStorage(nameCookieAccessToken);
        }
    
        return loginValid;
    } catch (err) {
        console.log(err);
        return false;
    }
}