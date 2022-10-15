import React from "react";
import { Routes, Route } from "react-router-dom";

import { pathRoutes } from "../helpers/constants";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

import ProductList from "../pages/Product/List";
import ProductCreate from "../pages/Product/Create";
import ProductEdit from "../pages/Product/Edit";

import UserList from "../pages/User/List";
import UserCreate from "../pages/User/CreateUser";
import UserEdit from "../pages/User/EditUser";

import NotFound from "../pages/NotFound/NotFound";

const Router = (props) => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path={pathRoutes.login} element={<Login />} />

            {/* Private routes TODO */}
            <Route path={pathRoutes.home} element={<Home />} />

            <Route path={pathRoutes.productList} element={<ProductList />} />
            <Route
                path={pathRoutes.productCreate}
                element={<ProductCreate />}
            />
            <Route path={pathRoutes.productEdit} element={<ProductEdit />} />

            <Route path={pathRoutes.userList} element={<UserList />} />
            <Route path={pathRoutes.userCreate} element={<UserCreate />} />
            <Route path={pathRoutes.userEdit} element={<UserEdit />} />

            {/* Redirect NotFound */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
