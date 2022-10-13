import React from "react";
import "./Login.css";
import { Form, Input, Card, Button, message } from "antd";
import { yupRuleValidator } from "../../validations/login/loginSchema";
import { signIn } from "../../services/account/login";
import { nameCookieAccessToken } from "../../helpers/constants";
import { setCookie } from "../../helpers/methods";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const resultSignIn = await signIn(form.getFieldsError(), form.getFieldsValue());
            if (!resultSignIn) {
                return;
            }
            setCookie(nameCookieAccessToken, resultSignIn.accessToken, resultSignIn.expiresIn);
            message.success("Login efetuado com sucesso");
            navigate("/Home");
        } catch (err) {
            message.error("Falha inesperada ao salvar token de acesso");
        } 
    };

    return (
        <div className="login">
            <Card title="Login" className="card-login">
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
            </Card>
        </div>
    );
}
