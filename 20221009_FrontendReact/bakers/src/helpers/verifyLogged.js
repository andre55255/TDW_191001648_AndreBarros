import { nameCookieAccessToken } from "./constants";
import { getCookie, removeCookie } from "./methods";
import { decode } from "jsonwebtoken";

export const verifyLogged = () => {
    const issJwt = process.env.REACT_APP_JWT_ISSUER || "";
    const audJwt = process.env.REACT_APP_JWT_AUDIENCE || "";

    let loginValid = false;

    const token = getCookie(nameCookieAccessToken);
    const decoded = decode(token);
    if (decoded && decoded.iss === issJwt && decoded.aud === audJwt) {
        loginValid = true;
    } else {
        removeCookie(nameCookieAccessToken);
    }

    return loginValid;
}