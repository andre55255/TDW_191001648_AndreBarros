import React, { useState } from "react";
import "./CreateUser.css";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { yupRuleValidator } from "../../validations/user/userSaveSchema";
import { createUser } from "../../services/user/createUser";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/User/User";

export default function CreateUser() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

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
    };

    return (
        <TemplateSave keyActive="2" loading={loading} title="Criar usuário">
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
                nameForm="form_create_user"
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
