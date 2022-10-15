import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import { getAllUnitOfMeasurements } from "../../services/unitOfMeasurement/getAll";
import { removeUnitOfMeasurement } from "../../services/unitOfMeasurement/remove";
import { keyMenus, pathRoutes } from "../../helpers/constants";
import { message } from "antd";
import ListCustom from "../../components/Template/List";

export default function List() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [units, setUnits] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const saves = await getAllUnitOfMeasurements();
            if (saves == null) {
                setLoading(false);
                navigate(pathRoutes.login);
                return;
            }
            setUnits(saves);
            setLoading(false);
        }
        fetchData();
    }, [setUnits, navigate]);

    const columns = [
        "Id",
        "Descrição",
        "Acoes",
    ];

    const data = units.map((item, ind) => {
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
            const result = await removeUnitOfMeasurement(id);
            if (!result) {
                setLoading(false);
                return;
            }
            message.success("Unidade de medida deletada com sucesso");

            const saves = await getAllUnitOfMeasurements();
            setUnits(saves);
            setLoading(false);
        } catch (err) {
            console.log(err);
            message.error("Falha ao requisitar a deleção de unidade de medida");
            setLoading(false);
        }
    };

    return (
        <ListCustom
            keyActive={keyMenus.unitOfMeasurement}
            title="Unidades de medida de produtos"
            pathPageCreate={pathRoutes.unitOfMeasurementCreate}
            pathPageEdit={pathRoutes.unitOfMeasurementEdit}
            loading={loading}
            columnsTable={columns}
            rowsTable={data}
            handleDelete={handleDelete}
        />
    );
}
