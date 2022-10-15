import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Product.css";
import { getAllCategories } from "../../../services/category/getAll";
import { getAllUnitOfMeasurements } from "../../../services/unitOfMeasurement/getAll";
import { pathRoutes } from "../../../helpers/constants";
import { Form, Input, InputNumber, Select } from "antd";
import TemplateForm from "../Template/Template";

export default function Product({
    form,
    nameForm,
    handleSubmit,
    yupRuleValidator,
    setLoading,
}) {
    const navigate = useNavigate();
    const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const categories = await getAllCategories();
            const units = await getAllUnitOfMeasurements();
            if (categories == null || units == null) {
                setLoading(false);
                navigate(pathRoutes.productList);
                return;
            }
            setCategories(categories);
            setUnitOfMeasurements(units);
            setLoading(false);
        }
        fetchData();
    }, [setCategories, setUnitOfMeasurements, navigate, setLoading]);

    const getCategories = () => {
        return categories.map((model, ind) => {
            return (
                <Select.Option key={ind} value={parseInt(model.id)}>
                    {model.description}
                </Select.Option>
            );
        });
    };

    const getUnitsOfMeasurement = () => {
        return unitOfMeasurements.map((model, ind) => {
            return (
                <Select.Option key={ind} value={parseInt(model.id)}>
                    {model.description}
                </Select.Option>
            );
        });
    };

    return (
        <TemplateForm
            form={form}
            nameForm={nameForm}
            handleSubmit={handleSubmit}
            pathBtnBack={pathRoutes.productList}
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
                name="barCode"
                label="Código de barras"
                required
                htmlFor="barCode"
                rules={[yupRuleValidator]}
            >
                <Input placeholder="Digite o código de barras" />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Quantidade em estoque"
                required
                htmlFor="quantity"
                rules={[yupRuleValidator]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Digite a quantidade em estoque"
                />
            </Form.Item>
            <Form.Item
                name="minQuantity"
                label="Quantidade mínima permitida"
                required
                htmlFor="minQuantity"
                rules={[yupRuleValidator]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Digite a quantidade mínima permitida"
                />
            </Form.Item>
            <Form.Item
                name="valueUnitary"
                label="Valor unitário (R$)"
                required
                htmlFor="valueUnitary"
                rules={[yupRuleValidator]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Digite o valor unitario (R$)"
                />
            </Form.Item>
            <Form.Item
                name="idUnitOfMeasurement"
                label="Unidade de medida"
                required
                htmlFor="idUnitOfMeasurement"
                rules={[yupRuleValidator]}
            >
                <Select placeholder="Selecione uma unidade de medida">
                    {getUnitsOfMeasurement()}
                </Select>
            </Form.Item>
            <Form.Item
                name="idCategory"
                label="Categoria"
                required
                htmlFor="idCategory"
                rules={[yupRuleValidator]}
            >
                <Select placeholder="Selecione uma categoria">
                    {getCategories()}
                </Select>
            </Form.Item>
        </TemplateForm>
    );
}
