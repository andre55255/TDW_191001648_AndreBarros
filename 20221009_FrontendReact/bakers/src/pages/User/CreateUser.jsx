import React, { useState, useEffect } from "react";
import "./CreateUser.css";
import Template from "../../components/Template/Home";
import {
    Col,
    Divider,
    Row,
    Space,
    Typography,
    Spin,
    Form,
    Input,
    Select,
    Button,
    message
} from "antd";
import { useNavigate } from "react-router-dom";
import { yupRuleValidator } from "../../validations/user/userSaveSchema";
import { getAllRoles } from "../../services/role/getAllRoles";
import { createUser } from "../../services/user/createUser";

export default function CreateUser() {
    const { Title } = Typography;

    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        async function fetchRoles() {
            const roles = await getAllRoles();
            if (roles == null) {
                setLoading(false);
                navigate("/");
                return;
            }
            setRoles(roles);
            setLoading(false);
        }
        fetchRoles();
    }, [setRoles, navigate]);

    const getRoles = () => {
        return roles.map((role) => {
            return (
                <Select.Option value={parseInt(role.id)}>
                    {role.description}
                </Select.Option>
            );
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await createUser(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Usuário inserido com sucesso");
            navigate("/user");
        } catch (err) {
            message.error("Falha inesperada ao salvar usuário");
            setLoading(false);
        }
    }

    return (
        <Template keyActive="2">
            <Spin spinning={loading}>
                <Row>
                    <Col span={24}>
                        <Space align="center">
                            <Title level={2}>Criar usuário</Title>
                        </Space>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <Space direction="vertical"></Space>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form
                            form={form}
                            name="form_save_user"
                            onSubmitCapture={handleSubmit}
                            layout="vertical"
                        >
                            <Form.Item
                                name="name"
                                label="Nome Completo"
                                required
                                htmlFor="name"
                                rules={[yupRuleValidator]}
                            >
                                <Input placeholder="Digite o nome completo" />
                            </Form.Item>
                            <Form.Item
                                name="login"
                                label="Login"
                                required
                                htmlFor="login"
                                rules={[yupRuleValidator]}
                            >
                                <Input placeholder="Digite o login" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Senha"
                                required
                                htmlFor="password"
                                rules={[yupRuleValidator]}
                            >
                                <Input.Password placeholder="Digite uma senha válida" />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirme a Senha"
                                required
                                htmlFor="confirmPassword"
                                rules={[yupRuleValidator]}
                            >
                                <Input.Password placeholder="Confirme sua senha" />
                            </Form.Item>
                            <Form.Item
                                name="roleId"
                                label="Perfil"
                                required
                                htmlFor="roleId"
                                rules={[yupRuleValidator]}
                            >
                                <Select placeholder="Selecione um perfil">{getRoles()}</Select>
                            </Form.Item>
                            <Button type="primary" block htmlType="submit">
                                Criar usuário
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Spin>
        </Template>
    );
}
