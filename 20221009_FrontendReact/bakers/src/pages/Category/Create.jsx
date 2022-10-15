import { Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import { createCategory } from "../../services/category/create";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Category/Category";
import { yupRuleValidator } from "../../validations/category/categorySaveSchema";

export default function Create() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await createCategory(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Categoria inserida com sucesso");
            navigate(pathRoutes.categoryList);
        } catch (err) {
            message.error("Falha inesperada ao inserir produto");
            setLoading(false);
        }
    };

    return (
        <TemplateSave keyActive={keyMenus.category} loading={loading} title="Criar categoria">
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
                nameForm="form_create_category"
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
