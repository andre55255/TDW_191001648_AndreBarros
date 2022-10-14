import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import User from "../pages/User/User";
import NotFound from "../pages/NotFound/NotFound";

const Router = (props) => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />

            {/* Private routes TODO */}
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<User />} />

            {/* Redirect NotFound */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
