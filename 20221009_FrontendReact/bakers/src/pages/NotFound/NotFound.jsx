import React from "react";

export default function NotFound() {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0efef"
            }}
        >
            <h1>ERROR 404 - NOT FOUND</h1>
            <h3>Página não encontrada :'(</h3>
        </div>
    );
}
