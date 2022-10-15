import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import { getAllRoles } from "../../services/role/getAllRoles";
import { removeRole } from "../../services/role/remove";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { message } from "antd";
import ListCustom from "../../components/Template/List";

export default function List() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const saves = await getAllRoles();
            if (saves == null) {
                setLoading(false);
                navigate(pathRoutes.login);
                return;
            }
            setRoles(saves);
            setLoading(false);
        }
        fetchData();
    }, [setRoles, navigate]);

    const columns = [
        "Id",
        "Descrição",
        "Acoes",
    ];

    const data = roles.map((item, ind) => {
        return {
            key: ind,
            Id: item.id,
            Descrição: item.description,
            Acoes: item.id,
        };
    });

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const result = await removeRole(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Perfil deletado com sucesso");

            const saves = await getAllRoles();
            setRoles(saves);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de perfil");
            setLoading(false);
        }
    };

    return (
        <ListCustom
            keyActive={keyMenus.role}
            title="Perfis de usuário"
            pathPageCreate={pathRoutes.roleCreate}
            pathPageEdit={pathRoutes.roleEdit}
            loading={loading}
            columnsTable={columns}
            rowsTable={data}
            handleDelete={handleDelete}
        />
    );
}
