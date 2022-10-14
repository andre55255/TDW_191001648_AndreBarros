import { Table } from "antd";
import React from "react";

export default function TableCustom({ columns, data }) {
    const columnsTable = columns.map((item) => {
        return {
            title: item,
            dataIndex: item,
            key: item,
            render: (text) => <b>{text}</b>,
        };
    });

    const dataTable = data.map((item) => {
        return {
            ...item
        };
    });

    return <Table columns={columnsTable} dataSource={dataTable} />;
}
