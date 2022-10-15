import React, { useEffect, useState } from "react";
import "./Edit.css";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Role/Role";
import { yupRuleValidator } from "../../validations/role/roleSaveSchema";
import { useParams, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { getByIdRole } from "../../services/role/getById";
import { editRole } from "../../services/role/edit";
import { keyMenus, pathRoutes } from "../../helpers/constants";

export default function Edit() {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const model = await getByIdRole(id);
            if (model == null) {
                setLoading(false);
                navigate(pathRoutes.roleList);
                return;
            }
            setRole(model);
            setLoading(false);
        }
        fetchServer();
    }, [id, navigate]);

    const setValuesFields = () => {
        form.setFieldValue("description", role.description);
    };
    setValuesFields();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editRole(
                form.getFieldsError(),
                form.getFieldsValue(),
                id
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Perfil editado com sucesso");
            navigate(pathRoutes.roleList);
        } catch (err) {
            message.error("Falha inesperada ao salvar perfil");
            setLoading(false);
        }
    };

    return (
        <TemplateSave
            keyActive={keyMenus.role}
            loading={loading}
            title="Editar perfil de usuário"
        >
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                nameForm="form_role_edit"
                setLoading={setLoading}
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
