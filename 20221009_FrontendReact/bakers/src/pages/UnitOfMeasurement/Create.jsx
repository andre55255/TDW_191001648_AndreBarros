import { Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import { createUnitOfMeasurement } from "../../services/unitOfMeasurement/create";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/UnitOfMeasurement/UnitOfMeasurement";
import { yupRuleValidator } from "../../validations/unitOfMeasurement/unitOfMeasSaveSchema";

export default function Create() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await createUnitOfMeasurement(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Unidade de medida inserida com sucesso");
            navigate(pathRoutes.unitOfMeasurementList);
        } catch (err) {
            message.error("Falha inesperada ao inserir unidade de medida");
            setLoading(false);
        }
    };

    return (
        <TemplateSave keyActive={keyMenus.unitOfMeasurement} loading={loading} title="Criar unidade de medida">
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
                nameForm="form_create_units"
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
