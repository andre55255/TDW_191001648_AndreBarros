import React, { useEffect, useState } from "react";
import "./OrderItem.css";
import TemplateForm from "../Template/Template";
import { pathRoutes } from "../../../helpers/constants";
import { Form, InputNumber, Select } from "antd";
import { getAllProducts } from "../../../services/product/getAll";

export default function OrderItem({
    form,
    nameForm,
    handleSubmit,
    yupRuleValidator,
    setLoading
}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const saves = await getAllProducts();
            setProducts(saves);
            setLoading(false);
        }
        fetchData();
    }, [setLoading]);

    const getProducts = () => {
        return products.map((model) => {
            return (
                <Select.Option key={model.id} value={parseInt(model.id)}>
                    {model.description} - Quantidade estoque: {model.quantity} -
                    Valor unitário: {model.valueUnitary}
                </Select.Option>
            );
        });
    };

    return (
        <TemplateForm
            form={form}
            nameForm={nameForm}
            handleSubmit={handleSubmit}
            pathBtnBack={pathRoutes.orderPadList}
        >
            <Form.Item
                name="quantity"
                label="Quantidade"
                required
                htmlFor="quantity"
                rules={[yupRuleValidator]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Digite a quantidade"
                />
            </Form.Item>
            <Form.Item
                name="productId"
                label="Produto"
                required
                htmlFor="productId"
                rules={[yupRuleValidator]}
            >
                <Select placeholder="Selecione um produto">
                    {getProducts()}
                </Select>
            </Form.Item>
        </TemplateForm>
    );
}
