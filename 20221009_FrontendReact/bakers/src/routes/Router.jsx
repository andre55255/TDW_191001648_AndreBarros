import React from "react";
import { Routes, Route } from "react-router-dom";
import { verifyLogged } from "../helpers/verifyLogged";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

const Router = (props) => {
    const isLogged = verifyLogged();

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />

            {/* Private routes TODO */}
            {isLogged ? (
                <Route path="/Home" element={<Home />} />
            ) : (
                <Route path="/" element={<Login />} />
            )}

            {/* Redirect NotFound */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
