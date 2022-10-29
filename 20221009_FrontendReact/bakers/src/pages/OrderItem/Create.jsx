import React, { useState } from "react";
import "./Create.css";
import TemplateSave from "../../components/Template/Save";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { useNavigate, useParams } from "react-router-dom";
import FormSave from "../../components/Form/OrderItem/OrderItem";
import { Form, message } from "antd";
import { createOrderPadItem } from "../../services/orderItem/create";
import { yupRuleValidator } from "../../validations/orderItem/orderItemSaveSchema";

export default function Create() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { idOrderPad } = useParams();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const result = await createOrderPadItem(
                form.getFieldsError(),
                form.getFieldsValue(),
                idOrderPad
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Item de comanda inserido com sucesso");
            navigate(pathRoutes.orderPadList);
        } catch (err) {
            message.error("Falha inesperada ao inserir item de comanda");
            setLoading(false);
        }
    };

    return (
        <TemplateSave
            keyActive={keyMenus.orderPads}
            loading={loading}
            title={`Criação de item de comanda para a comanda de id: ${idOrderPad}`}
        >
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
                nameForm="form_create_order_item"
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
