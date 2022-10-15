import React from "react";
import "./UnitOfMeasurement.css";
import TemplateForm from "../Template/Template";
import { pathRoutes } from "../../../helpers/constants";
import { Form, Input } from "antd";

export default function UnitOfMeasurement({
    form,
    nameForm,
    handleSubmit,
    yupRuleValidator,
    setLoading,
}) {
    return (
        <TemplateForm
            form={form}
            nameForm={nameForm}
            handleSubmit={handleSubmit}
            pathBtnBack={pathRoutes.unitOfMeasurementList}
        >
            <Form.Item
                name="description"
                label="Descrição"
                required
                htmlFor="description"
                rules={[yupRuleValidator]}
            >
                <Input placeholder="Digite a descrição" />
            </Form.Item>
        </TemplateForm>
    );
}

