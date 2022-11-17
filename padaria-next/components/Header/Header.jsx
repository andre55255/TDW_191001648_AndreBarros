import React, { useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import NextLink from "../Link/Link";
import ModalLogin from "../ModalLogin/ModalLogin";

export default function Header() {
    const [show, setShow] = useState(false);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NextLink href="/">
                    <Navbar.Brand>Naquele NaiPão</Navbar.Brand>
                </NextLink>
                <Navbar.Toggle />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/orders">Comandas</Nav.Link>
                        <Nav.Link href="/movements">Movimentos</Nav.Link>
                        <NavDropdown
                            title="Produtos"
                            id="collasible-nav-dropdown-product"
                        >
                            <NavDropdown.Item href="/products">
                                Lista de Produtos
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/categories">
                                Categorias
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/unitsOfMeasurements">
                                Unidades de medida
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="Usuários"
                            id="collasible-nav-dropdown-users"
                        >
                            <NavDropdown.Item href="/users">
                                Lista de usuários
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/roles">
                                Perfis
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Button
                            variant="outline-light"
                            onClick={() => setShow(true)}
                        >
                            Login
                        </Button>
                    </Nav>
                </Navbar.Collapse>
                <ModalLogin show={show} setShow={setShow} />
            </Container>
        </Navbar>
    );
}
