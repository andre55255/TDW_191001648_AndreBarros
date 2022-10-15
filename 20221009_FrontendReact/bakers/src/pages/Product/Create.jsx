import React, { useState } from "react";
import "./Create.css";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/product/create";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Product/Product";
import { yupRuleValidator } from "../../validations/product/productSaveSchema";

export default function Create() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await createProduct(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Produto inserido com sucesso");
            navigate(pathRoutes.productList);
        } catch (err) {
            message.error("Falha inesperada ao salvar produto");
            setLoading(false);
        }
    };

    return (
        <TemplateSave keyActive={keyMenus.product} loading={loading} title="Criar produto">
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
                nameForm="form_create_product"
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
