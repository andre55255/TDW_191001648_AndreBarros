import { Button, Form } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Template.css";

export default function Template({ form, nameForm, handleSubmit, pathBtnBack, children }) {

    const navigate = useNavigate();

    return (
        <Form
            form={form}
            name={nameForm}
            onSubmitCapture={handleSubmit}
            layout="vertical"
        >
            {children}
            <Button type="primary" block htmlType="submit">
                Enviar
            </Button>
            <Button
                style={{ marginTop: "0.5rem" }}
                type="ghost"
                block
                onClick={() => navigate(pathBtnBack)}
            >
                Voltar para lista
            </Button>
        </Form>
    );
}
