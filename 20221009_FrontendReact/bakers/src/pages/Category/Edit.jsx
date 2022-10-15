import React, { useEffect, useState } from "react";
import "./Edit.css";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Category/Category";
import { yupRuleValidator } from "../../validations/category/categorySaveSchema";
import { useParams, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { getByIdCategory } from "../../services/category/getById";
import { editCategory } from "../../services/category/edit";
import { keyMenus, pathRoutes } from "../../helpers/constants";

export default function Edit() {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    
    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const model = await getByIdCategory(id);
            if (model == null) {
                setLoading(false);
                navigate(pathRoutes.categoryList);
                return;
            }
            setCategory(model);
            setLoading(false);
        }
        fetchServer();
    }, [id, navigate]);

    const setValuesFields = () => {
        form.setFieldValue("description", category.description);
    };
    setValuesFields();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editCategory(
                form.getFieldsError(),
                form.getFieldsValue(),
                id
                );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Categoria editada com sucesso");
            navigate(pathRoutes.categoryList);
        } catch (err) {
            message.error("Falha inesperada ao salvar categoria");
            setLoading(false);
        }
    };

    return (
        <TemplateSave
            keyActive={keyMenus.category}
            loading={loading}
            title="Editar categoria de produto"
        >
            <FormSave 
                form={form}
                handleSubmit={handleSubmit}
                nameForm="form_category_edit"
                setLoading={setLoading}
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
