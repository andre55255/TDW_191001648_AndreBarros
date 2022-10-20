import Cookies from "universal-cookie";
import { nameCookieAccessToken } from "./constants";

export const buildAuthorization = () => {
    const token = getLocalStorage(nameCookieAccessToken);

    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
};

export const formatDate = (date) => {
    const dateObj = new Date(date),
        day = dateObj.getDate().toString(),
        dayF = day.length === 1 ? "0" + day : day,
        month = (dateObj.getMonth() + 1).toString(),
        monthF = month.length === 1 ? "0" + month : month,
        yearF = dateObj.getFullYear();
    return dayF + "/" + monthF + "/" + yearF;
};

export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const getLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const setCookie = (key, value, expires) => {
    try {
        const cookies = new Cookies();
        const expiresDate = new Date(expires);
        cookies.set(key, value, {
            expires: expiresDate || undefined,
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const getCookie = (key) => {
    try {
        const cookies = new Cookies();
        const val = cookies.get(key);
        return val;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const removeCookie = (key) => {
    try {
        const cookies = new Cookies();
        cookies.remove(key);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
