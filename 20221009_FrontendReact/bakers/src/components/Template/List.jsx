import React from "react";
import "./List.css";
import Template from "./Home";
import { Button, Col, Divider, Row, Space, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import TableCustom from "../Table/Table";

export default function List({
    keyActive,
    title,
    pathPageCreate,
    pathPageEdit,
    loading,
    columnsTable,
    rowsTable,
    handleDelete,
}) {
    const { Title } = Typography;

    const navigate = useNavigate();

    return (
        <Template keyActive={keyActive}>
            <Row>
                <Col span={24}>
                    <Space align="center">
                        <Title level={2}>{title}</Title>
                    </Space>
                    <Divider />
                </Col>
                <Col span={24}>
                    <Space align="end">
                        <Button
                            type="primary"
                            size="middle"
                            icon={<PlusOutlined />}
                            onClick={() => navigate(pathPageCreate)}
                        >
                            Criar
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
                    <Spin spinning={loading}>
                        <TableCustom
                            columns={columnsTable}
                            data={rowsTable}
                            handleDelete={handleDelete}
                            pathBaseEdit={pathPageEdit}
                        />
                    </Spin>
                </Col>
            </Row>
        </Template>
    );
}
