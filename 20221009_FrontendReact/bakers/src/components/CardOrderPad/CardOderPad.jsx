import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Space } from "antd";
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
                        onClick={() => navigate(pathRoutes.orderPadItemCreate)}
                    >
                        Criar item para esta comanda
                    </Button>
                    <Button
                        type="default"
                        size="middle"
                        icon={<EditOutlined />}
                        onClick={() => navigate(pathRoutes.orderPadEdit)}
                    >
                        Editar data de comanda
                    </Button>
                </Space>
                <TableCustom
                    columns={columns}
                    data={rows}
                    pathBaseEdit={pathRoutes.orderPadItemEdit}
                    handleDelete={handleDeleteItem}
                />
            </Card>
            <Divider />
        </>
    );
}
