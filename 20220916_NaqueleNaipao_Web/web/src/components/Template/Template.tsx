import React from "react";

import "../Container/colors.css";
import "../Container/container.css";
import "../Container/global.css";
import "../Container/typhografy.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

type Props = {
    homepage?: boolean,
    children?: React.ReactNode
};

export default function Template({ homepage, children }: Props): JSX.Element {
    if (homepage) {
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