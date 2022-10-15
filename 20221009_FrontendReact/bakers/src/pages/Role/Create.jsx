import { Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import { createRole } from "../../services/role/create";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Role/Role";
import { yupRuleValidator } from "../../validations/role/roleSaveSchema";

export default function Create() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await createRole(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Perfil inserido com sucesso");
            navigate(pathRoutes.roleList);
        } catch (err) {
            message.error("Falha inesperada ao inserir perfil");
            setLoading(false);
        }
    };

    return (
        <TemplateSave keyActive={keyMenus.role} loading={loading} title="Criar perfil de usuário">
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
                nameForm="form_create_roles"
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
