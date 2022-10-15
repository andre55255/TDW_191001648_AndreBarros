import React, { useEffect, useState } from "react";
import "./Edit.css";
import { getByIdProduct } from "../../services/product/getById";
import { editProduct } from "../../services/product/edit";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { useParams, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Product/Product";
import { yupRuleValidator } from "../../validations/product/productSaveSchema";

export default function Edit() {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    
    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const prod = await getByIdProduct(id);
            if (prod == null) {
                setLoading(false);
                navigate(pathRoutes.productList);
                return;
            }
            setProduct(prod);
            setLoading(false);
        }
        fetchServer();
    }, [id, navigate]);

    const setValuesFields = () => {
        form.setFieldValue("description", product.description);
        form.setFieldValue("barCode", product.barCode);
        form.setFieldValue("quantity", product.quantity);
        form.setFieldValue("minQuantity", product.minQuantity);
        form.setFieldValue("valueUnitary", product.valueUnitary);
        form.setFieldValue("idUnitOfMeasurement", product.unitOfMeasurementId);
        form.setFieldValue("idCategory", product.categoryId);
    };
    setValuesFields();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editProduct(
                form.getFieldsError(),
                form.getFieldsValue(),
                id
                );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Produto editado com sucesso");
            navigate(pathRoutes.productList);
        } catch (err) {
            message.error("Falha inesperada ao salvar produto");
            setLoading(false);
        }
    };

    return (
        <TemplateSave
            keyActive={keyMenus.product}
            loading={loading}
            title="Editar produto"
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
