import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

const Router = (): JSX.Element => (
    <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="*" element={<h1>Página não encontrada - 404</h1>}/>
    </Routes>
)

export default Router;