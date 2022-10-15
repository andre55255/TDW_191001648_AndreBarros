import React, { useEffect, useState } from "react";
import "./EditUser.css";
import Template from "../../components/Template/Home";
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    message,
    Row,
    Select,
    Space,
    Spin,
    Typography,
} from "antd";
import { getAllRoles } from "../../services/role/getAllRoles";
import { getByIdUser } from "../../services/user/getByIdUser";
import { useNavigate, useParams } from "react-router-dom";
import { yupRuleValidator } from "../../validations/user/userSaveSchema";
import { editUser } from "../../services/user/editUser";

export default function EditUser() {
    const { Title } = Typography;

    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const roles = await getAllRoles();
            if (roles == null) {
                setLoading(false);
                navigate("/user");
                return;
            }
            const user = await getByIdUser(id);
            if (user == null) {
                setLoading(false);
                navigate("/user");
                return;
            }
            setRoles(roles);
            setUser(user);
            setLoading(false);
        }
        fetchServer();
    }, [id, navigate]);

    const getRoles = () => {
        return roles.map((role, ind) => {
            return (
                <Select.Option key={ind} value={parseInt(role.id)}>
                    {role.description}
                </Select.Option>
            );
        });
    };

    const setValuesFields = () => {
        form.setFieldValue("name", user.name);
        form.setFieldValue("login", user.login);
        form.setFieldValue("roleId", user.roleId);
    }
    setValuesFields();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editUser(
                form.getFieldsError(),
                form.getFieldsValue(),
                id
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Usuário editado com sucesso");
            navigate("/user");
        } catch (err) {
            message.error("Falha inesperada ao salvar usuário");
            setLoading(false);
        }
    };

    return (
        <Template keyActive="2">
            <Spin spinning={loading}>
                <Row>
                    <Col span={24}>
                        <Space align="center">
                            <Title level={2}>
                                Editar usuário - {user.name}
                            </Title>
                        </Space>
                    </Col>
                    <Divider />
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
                                <Select placeholder="Selecione um perfil">
                                    {getRoles()}
                                </Select>
                            </Form.Item>
                            <Button type="primary" block htmlType="submit">
                                Editar usuário
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Spin>
        </Template>
    );
}
