import React, { useState, useEffect } from "react";
import "./List.css";
import ListOrderPads from "../../components/Template/ListOrderPad";
import { message } from "antd";
import { pathRoutes } from "../../helpers/constants";
import { useNavigate } from "react-router-dom";
import { getAllOrderPads } from "../../services/orderPad/getAll";
import { removeOrderPadItem } from "../../services/orderItem/remove";
import { removeOrderPad } from "../../services/orderPad/remove";

export default function List() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [orderPads, setOrderPads] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const saves = await getAllOrderPads();
            if (saves == null) {
                setLoading(false);
                navigate(pathRoutes.login);
                return;
            }
            console.log(saves);
            setOrderPads(saves);
            setLoading(false);
        }
        fetchData();
    }, [setOrderPads, navigate]);

    const handleDeleteItem = async (id) => {
        try {
            setLoading(true);
            const result = await removeOrderPadItem(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Item de comanda deletado com sucesso");

            const saves = await getAllOrderPads();
            setOrderPads(saves);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de item de comanda");
            setLoading(false);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            setLoading(true);
            const result = await removeOrderPad(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Comanda deletada com sucesso");

            const saves = await getAllOrderPads();
            setOrderPads(saves);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de comanda");
            setLoading(false);
        }
    };

    return (
        <ListOrderPads
            handleDeleteItem={handleDeleteItem}
            handleDeleteOrder={handleDeleteOrder}
            loading={loading}
            orderPads={orderPads}
        />
    );
}
