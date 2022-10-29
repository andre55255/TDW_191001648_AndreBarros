import React from "react";
import "./ListOrderPad.css";
import Template from "../../components/Template/Home";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { Button, Col, Divider, Row, Space, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CardOrderPad from "../CardOrderPad/CardOderPad";
import { useNavigate } from "react-router-dom";

export default function ListOrderPad({ loading, orderPads, handleDeleteItem }) {

    const navigate = useNavigate();
    const { Title } = Typography;

    const columnsTableItems = ["Id", "Valor", "Quantidade", "Produto", "Acoes"];
    const loadCardsOrderPads = () => {
        return orderPads.map((orderPad) => {
            const data = orderPad.items.map((item) => {
                return {
                    Id: item.id,
                    Valor: item.valueUnitary.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }),
                    Quantidade: item.quantity,
                    Produto: item.product.description,
                    Acoes: item.id,
                };
            });

            return (
                <CardOrderPad
                    columns={columnsTableItems}
                    rows={data}
                    orderPad={orderPad}
                    handleDeleteItem={handleDeleteItem}
                    key={orderPad.id}
                />
            );
        });
    };

    return (
        <Template keyActive={keyMenus.orderPads}>
            <Row>
                <Col span={24}>
                    <Space align="center">
                        <Title level={4}>Comandas</Title>
                    </Space>
                    <Divider />
                </Col>
                <Col span={24}>
                    <Space align="end">
                        <Button
                            type="primary"
                            size="middle"
                            icon={<PlusOutlined />}
                            onClick={() => navigate(pathRoutes.orderPadCreate)}
                        >
                            Criar comanda
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row
                style={{
                    marginTop: ".5rem",
                }}
            >
                <Col span={24}>
                    <Spin spinning={loading}>{loadCardsOrderPads()}</Spin>
                </Col>
            </Row>
        </Template>
    );
}
