import React, { useEffect, useState } from "react";
import "./User.css";
import TemplateForm from "../Template/Template";
import { Form, Input, Select } from "antd";
import { getAllRoles } from "../../../services/role/getAllRoles";
import { useNavigate } from "react-router-dom";
import { pathRoutes } from "../../../helpers/constants";

export default function User({
    form,
    nameForm,
    handleSubmit,
    yupRuleValidator,
    setLoading,
}) {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchRoles() {
            const roles = await getAllRoles();
            if (roles == null) {
                setLoading(false);
                navigate(pathRoutes.login);
                return;
            }
            setRoles(roles);
            setLoading(false);
        }
        fetchRoles();
    }, [setRoles, navigate, setLoading]);

    const getRoles = () => {
        return roles.map((role, ind) => {
            return (
                <Select.Option key={ind} value={parseInt(role.id)}>
                    {role.description}
                </Select.Option>
            );
        });
    };

    return (
        <TemplateForm
            form={form}
            nameForm={nameForm}
            handleSubmit={handleSubmit}
            pathBtnBack={pathRoutes.userList}
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
        </TemplateForm>
    );
}
