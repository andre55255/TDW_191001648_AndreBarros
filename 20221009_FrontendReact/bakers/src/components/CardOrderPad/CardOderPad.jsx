import {
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Popconfirm, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { pathRoutes } from "../../helpers/constants";
import { formatDate } from "../../helpers/methods";
import TableCustom from "../Table/Table";

export default function CardOderPad({
    orderPad,
    columns,
    rows,
    handleDeleteItem,
    handleDeleteOrder,
}) {
    const navigate = useNavigate();

    return (
        <>
            <Card
                title={`Id: ${orderPad.id} - Data: ${formatDate(
                    orderPad.date
                )}`}
                key={orderPad.id}
            >
                <Space
                    direction="horizontal"
                    style={{ marginBottom: "0.5rem" }}
                >
                    <Button
                        type="primary"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={() =>
                            navigate(
                                pathRoutes.orderPadItemCreate.replace(
                                    ":idOrderPad",
                                    orderPad.id
                                )
                            )
                        }
                    >
                        Criar item para esta comanda
                    </Button>
                    <Button
                        type="default"
                        size="middle"
                        icon={<EditOutlined />}
                        onClick={() => navigate(pathRoutes.orderPadItemEdit)}
                    >
                        Editar data de comanda
                    </Button>
                    <Popconfirm
                        title="Deseja realmente excluir esta comanda permanentemente?"
                        onConfirm={() => handleDeleteOrder(orderPad.id)}
                        onCancel={() => console.log("Não")}
                        okText="Sim"
                        cancelText="Não"
                        icon={
                            <InfoCircleOutlined style={{ color: "#dc143c" }} />
                        }
                    >
                        <Button
                            type="default"
                            size="middle"
                            icon={<DeleteOutlined />}
                            danger
                        >
                            Deletar comanda
                        </Button>
                    </Popconfirm>
                </Space>
                <TableCustom
                    columns={columns}
                    data={rows}
                    pathBaseEdit={pathRoutes.orderPadItemEdit}
                    handleDelete={handleDeleteItem}
                    pathEditOrderPad={pathRoutes.orderPadItemEdit.replace(
                        ":idOrderPad",
                        orderPad.id
                    )}
                />
            </Card>
            <Divider />
        </>
    );
}
