import React, { useContext } from "react";
import "./Home.css";
import Template from "../../components/Template/Home";
import { Space, Typography } from "antd";
import { userInfoContext } from "../../contexts/userInfo";
import { keyMenus } from "../../helpers/constants";

export default function Home() {
    const { userInfo } = useContext(userInfoContext);
    const { Title, Text } = Typography;

    return (
        <Template keyActive={keyMenus.home}>
            <Space direction="vertical" align="start">
                <Title level={2}>Olá, {userInfo.name}</Title>
                <Text>
                    Bem vindo ao sistema de gestão de padaria, criado durante a
                    disciplina de TDW
                </Text>
            </Space>
        </Template>
    );
}
