import React from "react";
import "./Movement.css";
import { pathRoutes } from "../../../helpers/constants";
import { DatePicker, Form, Input, InputNumber } from "antd";
import TemplateForm from "../Template/Template";

export default function Movement({
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
            pathBtnBack={pathRoutes.movementList}
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
            <Form.Item
                name="date"
                label="Data"
                required
                htmlFor="date"
                rules={[yupRuleValidator]}
            >
                <DatePicker style={{
                    width: "100%"
                }} />
            </Form.Item>
            <Form.Item
                name="value"
                label="Valor (R$)"
                required
                htmlFor="value"
                rules={[yupRuleValidator]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Digite o valor"
                />
            </Form.Item>
        </TemplateForm>
    );
}
