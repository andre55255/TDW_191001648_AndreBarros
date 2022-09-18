import React from "react";
import ImgBread from "../../assets/home.jpg";
import "./SectionHome.css";

export default function SectionHome() {
    return (
        <section className="home" id="home">
            <div className="home-container main-container main-grid">
                <div className="home-data">
                    <h1 className="home-title">
                        Naquele
                        <br />
                        <span className="home-title-secondary"> Naipão </span>
                    </h1>
                    <p className="home-subtitle">Melhores pãezinhos do Brasil</p>
                    <div className="home-btns">
                        <a href="#about" className="button">
                            Sobre nós
                        </a>
                        <a href="#partners" className="button-secondary">
                            Nossos parceiros
                            <i className="bx bx-right-arrow-alt button_icon"></i>
                        </a>
                    </div>
                    <div className="home-company"></div>
                </div>
                <img
                    src={ImgBread}
                    alt="Cesta de pães"
                    className="home-img"
                />
            </div>
        </section>
    );
}
