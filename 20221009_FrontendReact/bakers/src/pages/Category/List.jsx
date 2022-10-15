import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import { getAllCategories } from "../../services/category/getAll";
import { removeCategory } from "../../services/category/remove";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { message } from "antd";
import ListCustom from "../../components/Template/List";

export default function List() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const saves = await getAllCategories();
            if (saves == null) {
                setLoading(false);
                navigate(pathRoutes.login);
                return;
            }
            setCategories(saves);
            setLoading(false);
        }
        fetchData();
    }, [setCategories, navigate]);

    const columns = [
        "Id",
        "Descrição",
        "Acoes",
    ];

    const data = categories.map((item, ind) => {
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
            const result = await removeCategory(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Categoria deletada com sucesso");

            const saves = await getAllCategories();
            setCategories(saves);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de categoria");
            setLoading(false);
        }
    };

    return (
        <ListCustom
            keyActive={keyMenus.category}
            title="Categorias de produtos"
            pathPageCreate={pathRoutes.categoryCreate}
            pathPageEdit={pathRoutes.categoryEdit}
            loading={loading}
            columnsTable={columns}
            rowsTable={data}
            handleDelete={handleDelete}
        />
    );
}
