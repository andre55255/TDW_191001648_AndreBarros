import React, { useEffect, useState } from "react";
import "./EditUser.css";
import {
    Form,
    message,
} from "antd";
import { getByIdUser } from "../../services/user/getByIdUser";
import { useNavigate, useParams } from "react-router-dom";
import { yupRuleValidator } from "../../validations/user/userSaveSchema";
import { editUser } from "../../services/user/editUser";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/User/User";

export default function EditUser() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const user = await getByIdUser(id);
            if (user == null) {
                setLoading(false);
                navigate("/user");
                return;
            }
            setUser(user);
            setLoading(false);
        }
        fetchServer();
    }, [id, navigate]);

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
        <TemplateSave
            keyActive="2"
            loading={loading}
            title="Editar usuário"
        >
            <FormSave 
                form={form}
                handleSubmit={handleSubmit}
                nameForm="form_user_edit"
                setLoading={setLoading}
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
