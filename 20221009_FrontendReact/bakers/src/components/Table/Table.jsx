import {
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function TableCustom({
    columns,
    data,
    pathBaseEdit,
    handleDelete,
    pathEditOrderPad
}) {
    const columnsTable = columns.map((item) => {
        return {
            title: item,
            dataIndex: item,
            key: item,
            render: (text) =>
                item !== "Acoes" ? (
                    <span>{text}</span>
                ) : (
                    <>
                        <Space>
                            <Link
                                to={
                                    pathEditOrderPad
                                        ? pathEditOrderPad.replace(":idItem", text)
                                        : pathBaseEdit.replace(":id", text)
                                }
                            >
                                <EditOutlined
                                    color="#dbd800"
                                    style={{
                                        fontSize: "1.2rem",
                                    }}
                                />
                            </Link>
                            <Popconfirm
                                title="Deseja realmente excluir este dado?"
                                onConfirm={() => handleDelete(text)}
                                onCancel={() => console.log("Não")}
                                okText="Sim"
                                cancelText="Não"
                                icon={
                                    <InfoCircleOutlined
                                        style={{ color: "#dc143c" }}
                                    />
                                }
                            >
                                <DeleteOutlined
                                    style={{
                                        fontSize: "1.2rem",
                                        color: "#dc143c",
                                    }}
                                />
                            </Popconfirm>
                        </Space>
                    </>
                ),
        };
    });

    const dataTable = data.map((item) => {
        return {
            ...item,
        };
    });

    return <Table columns={columnsTable} dataSource={dataTable} />;
}
