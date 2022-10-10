import React, { useState, useContext } from "react";
import { Layout, Menu } from "antd";
import "./Dashboard.css";
import { HeartFilled, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/auth";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard(props) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [cookies, setCookies] = useCookies(["accessToken"]);

    function exit() {
        setCookies("accessToken", "");
        setAuth({
            accessToken: "",
        });
        navigate("/");
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/home">Home</Link>
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
