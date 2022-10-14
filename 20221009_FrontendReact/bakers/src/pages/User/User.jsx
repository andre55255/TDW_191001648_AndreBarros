import React, { useEffect, useState } from "react";
import "./User.css";
import Template from "../../components/Template/Home";
import { Button, Col, Divider, Row, Space, Typography, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllUsers } from "../../services/user/getAllUsers";
import { useNavigate } from "react-router-dom";
import TableCustom from "../../components/Table/Table";

export default function User() {
    const { Title } = Typography;

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchUsers() {
            const users = await getAllUsers();
            if (users == null) {
                setLoading(false);
                navigate("/");
                return;
            }
            setUsers(users);
            setLoading(false);
        }
        fetchUsers();
    }, [setUsers, navigate]);

    const columns = ["Id", "Login", "Nome", "Perfil"];

    const data = users.map((item, ind) => {
        return {
            key: ind,
            Id: item.id,
            Login: item.login,
            Nome: item.name,
            Perfil: item.roleName,
        };
    });

    return (
        <Template keyActive="2">
            <Row>
                <Col span={24}>
                    <Space align="center">
                        <Title level={2}>Usuários</Title>
                    </Space>
                </Col>
                <Divider />
                <Col span={24}>
                    <Space align="end">
                        <Button
                            type="primary"
                            size="middle"
                            icon={<PlusOutlined />}
                        >
                            Adicionar
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
                        <TableCustom columns={columns} data={data} />
                    </Spin>
                </Col>
            </Row>
        </Template>
    );
}
