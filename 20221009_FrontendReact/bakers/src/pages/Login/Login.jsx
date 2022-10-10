import React, { useContext } from "react";
import "./Login.css";
import { Form, Input, Card, Button, message } from "antd";
import { yupRuleValidator } from "../../validations/login/loginSchema";
import { signIn } from "../../services/login/login";
import { authContext } from "../../contexts/auth";
import { nameCookieAccessToken } from "../../helpers/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { setAuth } = useContext(authContext);
    const [cookies, setCookies] = useCookies([nameCookieAccessToken]);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const resultSignIn = await signIn(form.getFieldsError(), form.getFieldsValue());
            if (!resultSignIn) {
                return;
            }
            setAuth({
                [nameCookieAccessToken]: resultSignIn.accessToken
            });
            setCookies(nameCookieAccessToken, resultSignIn.accessToken);
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
