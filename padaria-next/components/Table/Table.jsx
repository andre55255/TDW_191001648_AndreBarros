import React from "react";

export default function Table({ columns, rows }) {

    const columnsTable = () => {
        return columns.map((col) => {
            return (
                <th key={col.label} scope="col">{col.label}</th>
            );
        });
    }

    const rowsTable = () => {
        return rows.map((row) => {
            return (
                <tr key={row.id}>
                    {columns.map((col) => {
                        <td>{rows[col.prop]}</td>
                    })}
                </tr>
            );
        });
    }

    return (
        <table class="table table-hover">
            <thead>
                <tr>
                    {columnsTable()}
                </tr>
            </thead>
            <tbody>
                {rowsTable()}
            </tbody>
        </table>
    );
}
