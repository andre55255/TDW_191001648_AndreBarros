import Cookies from "universal-cookie";
import { nameCookieAccessToken } from "./constants";

export const buildAuthorization = () => {
    const token = getCookie(nameCookieAccessToken);

    return {
        authorization: "Bearer " + token,
    };
};

export const setCookie = (key, value, expiresDate) => {
    try {
        const cookies = new Cookies();
        cookies.set(key, value, {
            secure: true,
            httpOnly: true,
            expires: expiresDate ?? undefined,
        });
    }
    catch (err) {
        console.log(err);
    }
};

export const getCookie = (key) => {
    try {
        const cookies = new Cookies();
        const val = cookies.get(key);
        return val;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

export const removeCookie = (key) => {
    try {
        const cookies = new Cookies();
        cookies.remove(key);
    } catch (err) {
        console.log(err);
    }
};
