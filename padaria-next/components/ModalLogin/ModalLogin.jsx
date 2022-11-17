import React from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "../Forms/LoginForm";

export default function ModalLogin({ show, setShow }) {

    return (
        <Modal size="lg" show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Faça login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm setShow={setShow} />
            </Modal.Body>
        </Modal>
    );
}
