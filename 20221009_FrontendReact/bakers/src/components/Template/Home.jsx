import React, { useState } from "react";
import { Layout, Menu } from "antd";
import "./Home.css";
import { HeartFilled, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { removeCookie } from "../../helpers/methods";
import { nameCookieAccessToken } from "../../helpers/constants";

const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard(props) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    function exit() {
        removeCookie(nameCookieAccessToken);
        navigate("/");
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/Home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<LogoutOutlined />} onClick={exit}>
                        Sair
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                />
                <Content style={{ margin: "0 16px" }}>{props.children}</Content>
                <Footer style={{ textAlign: "center" }}>
                    Desenvolvido com{" "}
                    <HeartFilled
                        style={{ color: "#ff0030", fontSize: "1.1rem" }}
                    />{" "}
                    por André Luiz Barros
                </Footer>
            </Layout>
        </Layout>
    );
}
