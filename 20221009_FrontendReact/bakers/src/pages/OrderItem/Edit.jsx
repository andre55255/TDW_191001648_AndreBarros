import React, { useState, useEffect } from "react";
import "./Edit.css";
import TemplateSave from "../../components/Template/Save";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { useNavigate, useParams } from "react-router-dom";
import FormEdit from "../../components/Form/OrderItem/Edit";
import { Form, message } from "antd";
import { getByIdOrderPad } from "../../services/orderItem/getById";
import { editOrderPadItem } from "../../services/orderItem/edit";
import { yupRuleValidator } from "../../validations/orderItem/orderItemEditSchema";

export default function Edit() {
    const [loading, setLoading] = useState(false);
    const [orderItem, setOrderItem] = useState({
        quantity: 0,
        valueUnitary: 0,
        productId: 0
    });

    const navigate = useNavigate();
    const { idOrderPad, idItem } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const model = await getByIdOrderPad(idItem);
            if (model == null) {
                setLoading(false);
                navigate(pathRoutes.orderPadList);
                return;
            }
            setOrderItem({
                productId: model.product.id,
                quantity: model.quantity,
                valueUnitary: model.valueUnitary
            });
            setLoading(false);
        }
        fetchServer();
    }, [idItem, navigate]);

    const setValuesFields = () => {
        form.setFieldValue("quantity", orderItem.quantity);
        form.setFieldValue("valueUnitary", orderItem.valueUnitary);
        form.setFieldValue("productId", orderItem.productId);
    };
    setValuesFields();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editOrderPadItem(
                form.getFieldsError(),
                form.getFieldsValue(),
                idItem,
                idOrderPad
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Item de comanda editado com sucesso");
            navigate(pathRoutes.orderPadList);
        } catch (err) {
            message.error("Falha inesperada ao salvar item de comanda");
            setLoading(false);
        }
    };

    return (
        <TemplateSave
            keyActive={keyMenus.orderPads}
            loading={loading}
            title={`Edição de item de comanda para a comanda de id: ${idOrderPad}`}
        >
            <FormEdit
                form={form}
                handleSubmit={handleSubmit}
                nameForm="form_edit_item"
                setLoading={setLoading}
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
