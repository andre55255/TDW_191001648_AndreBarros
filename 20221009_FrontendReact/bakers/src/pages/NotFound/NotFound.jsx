import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigation = useNavigate();

    return (
        <Result
            status="404"
            title="Ops"
            subTitle="Página não encontrada, desculpe :("
            extra={
                <Button type="primary" onClick={() => navigation("/home")}>
                    Voltar para Home
                </Button>
            }
        />
    );
}
