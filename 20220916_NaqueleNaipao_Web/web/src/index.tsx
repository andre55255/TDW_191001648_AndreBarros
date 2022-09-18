import React from "react";
import ReactDOM from "react-dom/client";
import App from "./container/App";

import { CookiesProvider } from "react-cookie";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider locale={ptBR}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>,
);
