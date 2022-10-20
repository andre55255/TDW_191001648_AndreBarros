import { Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import { createMovement } from "../../services/movement/create";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Movement/Movement";
import { yupRuleValidator } from "../../validations/movement/movementSaveSchema";

export default function Create() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await createMovement(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Movimento inserido com sucesso");
            navigate(pathRoutes.movementList);
        } catch (err) {
            message.error("Falha inesperada ao inserir movimento");
            setLoading(false);
        }
    };

    return (
        <TemplateSave keyActive={keyMenus.movement} loading={loading} title="Criar movimentação de caixa">
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
                nameForm="form_create_movement"
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
