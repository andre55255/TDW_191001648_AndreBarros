import React from "react";
import { BrowserRouter } from "react-router-dom";
import Template from "../components/Template/Template";
import Routes from "../routes/Router";

function App() {
    return (
        <Template>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Template>
    );
}

export default App;
