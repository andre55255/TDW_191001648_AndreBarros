import React, { useState } from "react";
import "./Login.css";
import { Form, Input, Card, Button, message, Spin } from "antd";
import { yupRuleValidator } from "../../validations/login/loginSchema";
import { signIn } from "../../services/account/login";
import {
    nameCookieAccessToken,
    nameCookieExpiresToken,
} from "../../helpers/constants";
import { setLocalStorage } from "../../helpers/methods";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const resultSignIn = await signIn(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!resultSignIn) {
                setLoading(false);
                return;
            }
            let result = setLocalStorage(
                nameCookieAccessToken,
                resultSignIn.accessToken
            );
            result = setLocalStorage(
                nameCookieExpiresToken,
                resultSignIn.expiresIn
            );
            if (!result) {
                message.error("Falha ao inserir salvar token de acesso");
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Login efetuado com sucesso");
            navigate("/Home");
        } catch (err) {
            message.error("Falha inesperada ao salvar token de acesso");
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <Card title="Login" className="card-login">
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        name="form_login"
                        onSubmitCapture={handleSubmit}
                    >
                        <Form.Item
                            name="login"
                            label="Login"
                            htmlFor="login"
                            rules={[yupRuleValidator]}
                        >
                            <Input placeholder="Digite seu login" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Senha"
                            htmlFor="password"
                            rules={[yupRuleValidator]}
                        >
                            <Input.Password placeholder="Digite sua senha" />
                        </Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Logar
                        </Button>
                    </Form>
                </Spin>
            </Card>
        </div>
    );
}
