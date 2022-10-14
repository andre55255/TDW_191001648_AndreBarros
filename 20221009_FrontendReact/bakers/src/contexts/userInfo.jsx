import React, { useState } from "react";

export const userInfoContext = React.createContext({});

export const UserInfoProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        id: "",
        login: "",
        name: "",
        status: "",
        roleId: "",
        roleName: ""
    });

    return (
        <userInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </userInfoContext.Provider>
    );
};
