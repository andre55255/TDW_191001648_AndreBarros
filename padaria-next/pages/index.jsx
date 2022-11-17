import React, { useState, useEffect } from "react";
import TemplateLista from "../components/TemplateLista/TemplateLista";
import { getAllUsers } from "../services/user/getAllUsers";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const users = await getAllUsers();
            if (users == null) {
                return;
            }
            setUsers(users);
        }
        fetchUsers();
    }, [setUsers]);

    const colunas = {
        id: "Id",
        name: "Nome",
        login: "Login",
        password: "Senha",
        status: "Status",
        roleId: "Perfil ID",
        acoes: "Ações",
    };

    const linhas = users.map((el) => {
        return {
            id: el.id,
            name: el.name,
            login: el.login,
            password: el.password,
            status: el.status,
            roleId: el.roleId
        }
    });

    console.log(linhas);

    return (
        <TemplateLista
            colunas={colunas}
            linhas={linhas}
            caminhoCriar="/usuarios/criar"
            caminhoEditar="/usuarios/editar/:id"
            handleDelete={(id) => console.log("Deletando usuário, id: " + id)}
        />
    );
}
