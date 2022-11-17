import React from "react";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const TableCustom = ({ colunas, linhas, handleDelete, caminhoEditar }) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {Object.values(colunas).map((col) => {
                            return <th key={col}>{col}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {linhas.map((linha, ind) => {
                        return (
                            <tr key={linha.id ?? ind}>
                                {Object.values(linha).map((linha2) => {
                                    return <td>{linha2}</td>;
                                })}
                                <td>
                                    <a href={caminhoEditar.replace(":id", linha.id)}>
                                        <span
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <FaEdit size={24} color="#FFC107" />
                                        </span>
                                    </a>
                                    <span
                                        className="mx-2"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    `Deseja realmente deletar este item, id: ${linha.id}?`
                                                )
                                            ) {
                                                handleDelete(linha.id);
                                            }
                                        }}
                                    >
                                        <FaTrash size={24} color="#DC3545" />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default TableCustom;