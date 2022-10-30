import { Modal } from "antd";
import React from "react";
import "./ModalCustom.css";
import FormSave from "../Form/Order/Save";

export default function ModalCustom({
    setIsModalOpen,
    isModalOpen,
    title,
    loading,
    handleSubmit,
    form,
    nameForm,
    yupRuleValidator,
}) {
    return (
        <Modal title={title} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[]}>
            <FormSave
                form={form}
                handleSubmit={handleSubmit}
                nameForm={nameForm}
                loading={loading}
                yupRuleValidator={yupRuleValidator}
                setIsModalOpen={setIsModalOpen}
            />
        </Modal>
    );
}
