import React from "react";
import { Routes, Route } from "react-router-dom";

import { pathRoutes } from "../helpers/constants";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

import ProductList from "../pages/Product/List";
import ProductCreate from "../pages/Product/Create";
import ProductEdit from "../pages/Product/Edit";

import CategoryList from "../pages/Category/List";
import CategoryCreate from "../pages/Category/Create";
import CategoryEdit from "../pages/Category/Edit";

import RoleList from "../pages/Role/List";
import RoleCreate from "../pages/Role/Create";
import RoleEdit from "../pages/Role/Edit";

import UnitsList from "../pages/UnitOfMeasurement/List";
import UnitsCreate from "../pages/UnitOfMeasurement/Create";
import UnitsEdit from "../pages/UnitOfMeasurement/Edit";

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

            <Route path={pathRoutes.categoryList} element={<CategoryList />} />
            <Route
                path={pathRoutes.categoryCreate}
                element={<CategoryCreate />}
            />
            <Route path={pathRoutes.categoryEdit} element={<CategoryEdit />} />

            <Route path={pathRoutes.productList} element={<ProductList />} />
            <Route
                path={pathRoutes.productCreate}
                element={<ProductCreate />}
            />
            <Route path={pathRoutes.productEdit} element={<ProductEdit />} />

            <Route path={pathRoutes.roleList} element={<RoleList />} />
            <Route path={pathRoutes.roleCreate} element={<RoleCreate />} />
            <Route path={pathRoutes.roleEdit} element={<RoleEdit />} />

            <Route
                path={pathRoutes.unitOfMeasurementList}
                element={<UnitsList />}
            />
            <Route
                path={pathRoutes.unitOfMeasurementCreate}
                element={<UnitsCreate />}
            />
            <Route
                path={pathRoutes.unitOfMeasurementEdit}
                element={<UnitsEdit />}
            />

            <Route path={pathRoutes.userList} element={<UserList />} />
            <Route path={pathRoutes.userCreate} element={<UserCreate />} />
            <Route path={pathRoutes.userEdit} element={<UserEdit />} />

            {/* Redirect NotFound */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
