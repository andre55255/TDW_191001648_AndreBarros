import React, { useEffect, useState } from "react";
import "./Edit.css";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/Movement/Movement";
import { yupRuleValidator } from "../../validations/movement/movementSaveSchema";
import { useParams, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { getByIdMovement } from "../../services/movement/getById";
import { editMovement } from "../../services/movement/edit";
import { keyMenus, pathRoutes } from "../../helpers/constants";

export default function Edit() {
    const [loading, setLoading] = useState(false);
    const [movement, setMovement] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const model = await getByIdMovement(id);
            if (model == null) {
                setLoading(false);
                navigate(pathRoutes.movementList);
                return;
            }
            setMovement(model);
            setLoading(false);
        }
        fetchServer();
    }, [id, navigate]);

    const setValuesFields = () => {
        form.setFieldValue("description", movement.description);
        // form.setFieldValue("date", movement.date);
        form.setFieldValue("value", movement.totalValue);
    };
    setValuesFields();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editMovement(
                form.getFieldsError(),
                form.getFieldsValue(),
                id
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Movimento editado com sucesso");
            navigate(pathRoutes.movementList);
        } catch (err) {
            message.error("Falha inesperada ao salvar movimento");
            setLoading(false);
        }
    };

    return (
        <TemplateSave
            keyActive={keyMenus.movement}
            loading={loading}
            title="Editar movimentação"
        >
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                nameForm="form_movement_edit"
                setLoading={setLoading}
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
