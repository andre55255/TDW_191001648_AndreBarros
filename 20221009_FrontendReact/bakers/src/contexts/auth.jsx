import React, { useState } from "react";
import { nameCookieAccessToken } from "../helpers/constants";
import { getCookie } from "../helpers/methods";

export const authContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        [nameCookieAccessToken]: "" || getCookie(nameCookieAccessToken),
    });

    return (
        <authContext.Provider value={{ auth, setAuth }}>
            {children}
        </authContext.Provider>
    );
};
