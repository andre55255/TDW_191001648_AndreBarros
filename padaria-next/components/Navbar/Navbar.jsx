import React from "react";
import Link from "../Link/Link";

export default function Index() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <Link href="/" className="navbar-brand">
                    Naquele NaiPão
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/orders">
                                Comandas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/movements">
                                Movimentos
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                id="navbarDropdownProd"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Produtos
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link
                                        href="/products"
                                        className="dropdown-item"
                                    >
                                        Lista de produtos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/categories"
                                        className="dropdown-item"
                                    >
                                        Categorias
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/unitsOfMeasurement"
                                        className="dropdown-item"
                                    >
                                        Unidades de medida
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                id="navbarDropdownUsers"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Usuários
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link
                                        href="/users"
                                        className="dropdown-item"
                                    >
                                        Lista de usuários
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/roles"
                                        className="dropdown-item"
                                    >
                                        Perfis
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
