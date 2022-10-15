import React, { useEffect, useState } from "react";
import "./List.css";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/product/getAll";
import { removeProduct } from "../../services/product/remove";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { message } from "antd";
import ListCustom from "../../components/Template/List";

export default function List() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const prods = await getAllProducts();
            if (prods == null) {
                setLoading(false);
                navigate(pathRoutes.login);
                return;
            }
            setProducts(prods);
            setLoading(false);
        }
        fetchData();
    }, [setProducts, navigate]);

    const columns = [
        "Id",
        "Descrição",
        "Codigo de barras",
        "Quantidade",
        "Quantidade Mínima",
        "Valor unitario",
        "Categoria",
        "Unidade medida",
        "Acoes",
    ];

    const data = products.map((item, ind) => {
        return {
            key: ind,
            Id: item.id,
            Descrição: item.description,
            "Codigo de barras": item.barCode,
            Quantidade: item.quantity,
            "Quantidade Mínima": item.minQuantity,
            "Valor unitario": item.valueUnitary.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
            Categoria: item.category.description,
            "Unidade medida": item.unitOfMeasurement.description,
            Acoes: item.id,
        };
    });

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const result = await removeProduct(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Produto deletado com sucesso");

            const prods = await getAllProducts();
            setProducts(prods);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de produto");
            setLoading(false);
        }
    };

    return (
        <ListCustom
            keyActive={keyMenus.product}
            title="Produtos"
            pathPageCreate={pathRoutes.productCreate}
            pathPageEdit={pathRoutes.productEdit}
            loading={loading}
            columnsTable={columns}
            rowsTable={data}
            handleDelete={handleDelete}
        />
    );
}
