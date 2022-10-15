import { Col, Divider, Row, Space, Spin, Typography } from "antd";
import React from "react";
import "./Save.css";
import Template from "./Home";

export default function Save({ keyActive, loading, title, children }) {

    const { Title } = Typography;

    return (
        <Template keyActive={keyActive}>
            <Spin spinning={loading}>
                <Row>
                    <Col span={24}>
                        <Space align="center">
                            <Title level={2}>{title}</Title>
                        </Space>
                    </Col>
                    <Divider />
                </Row>
                <Row>
                    <Col span={24}>
                        {children}
                    </Col>
                </Row>
            </Spin>
        </Template>
    );
}
