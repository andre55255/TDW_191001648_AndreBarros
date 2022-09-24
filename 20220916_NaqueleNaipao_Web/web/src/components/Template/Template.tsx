import React from "react";

import "../Utils/Variables.css";
import "../Utils/Container.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

type Props = {
    isHomePage?: boolean,
    children?: React.ReactNode
};

export default function Template({ isHomePage, children }: Props): JSX.Element {
    if (isHomePage) {
        return (
            <div className="container">
                <Header />
                <Main />
                <hr className="hr-footer" />
                <Footer />
            </div>
        );
    }
    else {
        return (
            <h1>{children}</h1>
        );
    }
}