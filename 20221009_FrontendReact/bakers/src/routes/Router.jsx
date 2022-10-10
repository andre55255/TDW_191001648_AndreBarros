import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

const Router = (props) => (
    <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        
        {/* Private routes TODO */}
        <Route path="/Home" element={<Home />}/>
        
        {/* Redirect NotFound */}
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;
