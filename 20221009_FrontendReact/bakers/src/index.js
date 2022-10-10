import React from "react";
import ReactDOM from "react-dom/client";
import App from "./container/App";

import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./contexts/auth";

import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CookiesProvider>
        <AuthProvider>
            <ConfigProvider locale={ptBR}>
                <App />
            </ConfigProvider>
        </AuthProvider>
    </CookiesProvider>
);
