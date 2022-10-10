import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";

const Router = (props) => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;
