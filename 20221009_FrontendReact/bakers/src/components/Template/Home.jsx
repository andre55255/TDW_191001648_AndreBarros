import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, message, Avatar, Dropdown, Spin } from "antd";
import "./Home.css";
import {
    AuditOutlined,
    BarcodeOutlined,
    BranchesOutlined,
    HeartFilled,
    HomeOutlined,
    LogoutOutlined,
    PieChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { removeLocalStorage } from "../../helpers/methods";
import {
    keyMenus,
    nameCookieAccessToken,
    nameCookieExpiresToken,
    pathRoutes,
} from "../../helpers/constants";
import { getUserInfo } from "../../services/account/userInfo";
import { userInfoContext } from "../../contexts/userInfo";
import { verifyLogged } from "../../helpers/verifyLogged";

const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard(props) {
    const [collapsed, setCollapsed] = useState(true);
    const { userInfo, setUserInfo } = useContext(userInfoContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const isLogged = verifyLogged();
        if (!isLogged) {
            setLoading(false);
            message.error("Acesso negado, faça login");
            navigate(pathRoutes.login);
            return;
        }

        async function fetchUserInfo() {
            const respGetUserInfo = await getUserInfo();

            if (!respGetUserInfo || respGetUserInfo.unauthorized) {
                setLoading(false);
                removeLocalStorage(nameCookieExpiresToken);
                removeLocalStorage(nameCookieAccessToken);
                navigate(pathRoutes.login);
            }

            setUserInfo({
                id: respGetUserInfo.id,
                login: respGetUserInfo.login,
                name: respGetUserInfo.name,
                status: respGetUserInfo.status,
                roleId: respGetUserInfo.roleId,
                roleName: respGetUserInfo.roleName,
            });
            setLoading(false);
        }
        fetchUserInfo();
        setLoading(false);
    }, [navigate, setUserInfo]);

    function exit() {
        removeLocalStorage(nameCookieExpiresToken);
        removeLocalStorage(nameCookieAccessToken);
        navigate(pathRoutes.login);
    }

    const menuHeader = (
        <Menu
            items={[
                {
                    key: "0",
                    label: "Alterar dados de perfil",
                },
                {
                    key: "1",
                    label: "Trocar senha",
                },
            ]}
        />
    );

    return (
        <Spin spinning={loading}>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        activeKey={props.keyActive}
                        selectedKeys={props.keyActive}
                    >
                        <Menu.Item key={keyMenus.home} icon={<HomeOutlined />}>
                            <Link to={pathRoutes.home}>Home</Link>
                        </Menu.Item>
                        <Menu.Item
                            key={keyMenus.category}
                            icon={<BranchesOutlined />}
                        >
                            <Link to={pathRoutes.categoryList}>Categorias</Link>
                        </Menu.Item>
                        <Menu.Item
                            key={keyMenus.product}
                            icon={<BarcodeOutlined />}
                        >
                            <Link to={pathRoutes.productList}>Produtos</Link>
                        </Menu.Item>
                        <Menu.Item key={keyMenus.role} icon={<AuditOutlined />}>
                            <Link to={pathRoutes.roleList}>Perfis</Link>
                        </Menu.Item>
                        <Menu.Item
                            key={keyMenus.unitOfMeasurement}
                            icon={<PieChartOutlined />}
                        >
                            <Link to={pathRoutes.unitOfMeasurementList}>Unidades de medida</Link>
                        </Menu.Item>
                        <Menu.Item key={keyMenus.user} icon={<UserOutlined />}>
                            <Link to={pathRoutes.userList}>Usuários</Link>
                        </Menu.Item>
                        <Menu.Item
                            key={keyMenus.exit}
                            icon={<LogoutOutlined />}
                            onClick={exit}
                        >
                            Sair
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background header">
                        <Dropdown overlay={menuHeader} trigger={["click"]}>
                            <Avatar
                                size={58}
                                style={{
                                    backgroundColor: "#002140",
                                    fontSize: "2rem",
                                    marginRight: ".3rem",
                                    cursor: "pointer",
                                }}
                            >
                                {userInfo.name[0]}
                            </Avatar>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: "0 16px" }}>
                        {props.children}
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Desenvolvido com{" "}
                        <HeartFilled
                            style={{ color: "#ff0030", fontSize: "1.1rem" }}
                        />{" "}
                        por André Luiz Barros
                    </Footer>
                </Layout>
            </Layout>
        </Spin>
    );
}
