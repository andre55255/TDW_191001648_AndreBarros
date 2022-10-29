import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import { getAllMovements } from "../../services/movement/getAll";
import { removeMovement } from "../../services/movement/remove";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { message } from "antd";
import ListCustom from "../../components/Template/List";
import { formatDate } from "../../helpers/methods";

export default function List() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const saves = await getAllMovements();
            if (saves == null) {
                setLoading(false);
                navigate(pathRoutes.login);
                return;
            }
            setMovements(saves);
            setLoading(false);
        }
        fetchData();
    }, [setMovements, navigate]);

    const columns = [
        "Id",
        "Descrição",
        "Data",
        "Tipo",
        "Valor",
        "Usuário",
        "Acoes",
    ];

    const data = movements.map((item, ind) => {
        return {
            key: item.id,
            Id: item.id,
            Descrição: item.description,
            Data: formatDate(item.date),
            Tipo: item.type,
            Valor: item.totalValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
            "Usuário": item.userName,
            Acoes: item.id,
        };
    });

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const result = await removeMovement(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Movimento deletado com sucesso");

            const saves = await getAllMovements();
            setMovements(saves);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de movimentos");
            setLoading(false);
        }
    };

    return (
        <ListCustom
            keyActive={keyMenus.movement}
            title="Movimentações"
            pathPageCreate={pathRoutes.movementCreate}
            pathPageEdit={pathRoutes.movementEdit}
            loading={loading}
            columnsTable={columns}
            rowsTable={data}
            handleDelete={handleDelete}
        />
    );
}
