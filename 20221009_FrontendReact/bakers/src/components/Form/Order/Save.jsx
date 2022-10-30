import { DatePicker, Form, Spin } from "antd";
import React from "react";
import TemplateForm from "../Template/Template";
import { pathRoutes } from "../../../helpers/constants";

export default function Save({
    form,
    nameForm,
    handleSubmit,
    yupRuleValidator,
    loading,
    setIsModalOpen
}) {
    return (
        <TemplateForm
            form={form}
            nameForm={nameForm}
            handleSubmit={handleSubmit}
            pathBtnBack={pathRoutes.orderPadList}
            isModal={true}
            setIsModalOpen={setIsModalOpen}
        >
            <Spin spinning={loading}>
                <Form.Item
                    name="date"
                    label="Data"
                    required
                    htmlFor="date"
                    rules={[yupRuleValidator]}
                >
                    <DatePicker
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>
            </Spin>
        </TemplateForm>
    );
}
