import React from "react";
import ReactDOM from "react-dom/client";
import App from "./container/App";

import { UserInfoProvider } from "./contexts/userInfo";

import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserInfoProvider>
        <ConfigProvider locale={ptBR}>
            <App />
        </ConfigProvider>
    </UserInfoProvider>
);
