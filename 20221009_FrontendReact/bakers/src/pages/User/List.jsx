import React, { useEffect, useState } from "react";
import "./List.css";
import { message } from "antd";
import { getAllUsers } from "../../services/user/getAllUsers";
import { removeUser } from "../../services/user/removeUser";
import { useNavigate } from "react-router-dom";
import ListCustom from "../../components/Template/List";
import { pathRoutes } from "../../helpers/constants";

export default function User() {
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

    const columns = ["Id", "Login", "Nome", "Perfil", "Acoes"];

    const data = users.map((item, ind) => {
        return {
            key: ind,
            Id: item.id,
            Login: item.login,
            Nome: item.name,
            Perfil: item.roleName,
            Acoes: item.id,
        };
    });

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const result = await removeUser(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Usuário deletado com sucesso");

            const users = await getAllUsers();
            setUsers(users);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de usuário");
            setLoading(false);
        }
    };

    return (
        <ListCustom
            keyActive="2"
            title="Usuários"
            pathPageCreate={pathRoutes.userCreate}
            pathPageEdit={pathRoutes.userEdit}
            loading={loading}
            columnsTable={columns}
            rowsTable={data}
            handleDelete={handleDelete}
        />
    );
}
