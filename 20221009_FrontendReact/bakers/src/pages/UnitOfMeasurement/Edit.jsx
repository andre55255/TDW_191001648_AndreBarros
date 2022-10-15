import React, { useEffect, useState } from "react";
import "./Edit.css";
import TemplateSave from "../../components/Template/Save";
import FormSave from "../../components/Form/UnitOfMeasurement/UnitOfMeasurement";
import { yupRuleValidator } from "../../validations/unitOfMeasurement/unitOfMeasSaveSchema";
import { useParams, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { getByIdUnitOfMeasurement } from "../../services/unitOfMeasurement/getById";
import { editUnitOfMeasurement } from "../../services/unitOfMeasurement/edit";
import { keyMenus, pathRoutes } from "../../helpers/constants";

export default function Edit() {
    const [loading, setLoading] = useState(false);
    const [unitOfMeasurement, setUnitOfMeasurement] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        async function fetchServer() {
            const model = await getByIdUnitOfMeasurement(id);
            if (model == null) {
                setLoading(false);
                navigate(pathRoutes.unitOfMeasurementList);
                return;
            }
            setUnitOfMeasurement(model);
            setLoading(false);
        }
        fetchServer();
    }, [id, navigate]);

    const setValuesFields = () => {
        form.setFieldValue("description", unitOfMeasurement.description);
    };
    setValuesFields();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await editUnitOfMeasurement(
                form.getFieldsError(),
                form.getFieldsValue(),
                id
            );
            if (!result) {
                setLoading(false);
                return;
            }
            setLoading(false);
            message.success("Unidade de medida editada com sucesso");
            navigate(pathRoutes.unitOfMeasurementList);
        } catch (err) {
            message.error("Falha inesperada ao salvar unidade de medida");
            setLoading(false);
        }
    };

    return (
        <TemplateSave
            keyActive={keyMenus.unitOfMeasurement}
            loading={loading}
            title="Editar unidade de medida"
        >
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                nameForm="form_units_edit"
                setLoading={setLoading}
                yupRuleValidator={yupRuleValidator}
            />
        </TemplateSave>
    );
}
