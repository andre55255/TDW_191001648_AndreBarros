import React, { useState } from "react";
import "./Edit.css";
import ModalSave from "../../components/Modal/ModalCustom";
import { Form, message } from "antd";
import { yupRuleValidator } from "../../validations/order/orderSaveSchema";
import { editOrderPad } from "../../services/orderPad/edit";
import { getAllOrderPads } from "../../services/orderPad/getAll";

export default function Edit({ isModalOpen, setIsModalOpen, idOrderPad, setOrderPads }) {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editOrderPad(
                form.getFieldsError(),
                form.getFieldsValue(),
                idOrderPad
            );
            if (!result) {
                setLoading(false);
                return;
            }
            const saves = await getAllOrderPads();
            setOrderPads(saves);
            setLoading(false);
            setIsModalOpen(false);
            message.success("Comanda editada com sucesso");
        } catch (err) {
            message.error("Falha inesperada ao editar comanda");
            setLoading(false);
        }
    };

    return (
        <ModalSave
            loading={loading}
            title={`Editar data de comanda: ${idOrderPad}`}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            nameForm="form_edit_order"
            form={form}
            yupRuleValidator={yupRuleValidator}
            handleSubmit={handleSubmit}
        />
    );
}
