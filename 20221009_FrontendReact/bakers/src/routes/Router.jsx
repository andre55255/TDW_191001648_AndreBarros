import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import UserList from "../pages/User/User";
import UserCreate  from "../pages/User/CreateUser";
import NotFound from "../pages/NotFound/NotFound";

const Router = (props) => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />

            {/* Private routes TODO */}
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/user/create" element={<UserCreate />} />

            {/* Redirect NotFound */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
