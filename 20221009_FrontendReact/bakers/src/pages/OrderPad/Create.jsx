import React, { useState } from "react";
import "./Create.css";
import ModalSave from "../../components/Modal/ModalCustom";
import { Form, message } from "antd";
import { yupRuleValidator } from "../../validations/order/orderSaveSchema";
import { createOrderPad } from "../../services/orderPad/create";
import { getAllOrderPads } from "../../services/orderPad/getAll";

export default function Create({ isModalOpen, setIsModalOpen, setOrderPads }) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await createOrderPad(
                form.getFieldsError(),
                form.getFieldsValue()
            );
            if (!result) {
                setLoading(false);
                return;
            }
            const saves = await getAllOrderPads();
            setOrderPads(saves);
            setLoading(false);
            setIsModalOpen(false);
            message.success("Comanda inserida com sucesso");
        } catch (err) {
            message.error("Falha inesperada ao inserir comanda");
            setLoading(false);
        }
    };

    return (
        <ModalSave
            loading={loading}
            title="Nova comanda"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            nameForm="form_create_order"
            form={form}
            yupRuleValidator={yupRuleValidator}
            handleSubmit={handleSubmit}
        />
    );
}
