import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { nameCookieAccessToken } from "../helpers/constants";

export const authContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [cookies, setCookies] = useCookies([nameCookieAccessToken]);
    const [auth, setAuth] = useState({
        [nameCookieAccessToken]: "" || cookies.accessToken,
    });

    return (
        <authContext.Provider value={{ auth, setAuth }}>
            {children}
        </authContext.Provider>
    );
};
