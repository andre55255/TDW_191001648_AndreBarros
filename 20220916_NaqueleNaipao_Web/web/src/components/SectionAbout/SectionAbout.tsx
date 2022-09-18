import React from "react";
import "./SectionAbout.css";
import ImgAbout from "../../assets/about.jpg";
import { BiArrowToRight } from "react-icons/bi";

export default function SectionAbout() {
    return (
        <section id="about">
            <div className="about-container main-container main-grid">
                <img
                    className="about-img"
                    src={ImgAbout}
                    width="413"
                    height="524"
                    alt="Imagem sobre a padaria"
                />
                <div className="about-data">
                    <h1 className="about-title">Sobre nós</h1>
                    <p className="about-subtitle">
                        Uma padaria de quebrada, mas que fornece mercadoria de
                        qualidade. Tá Ligado?! Então chega mais.
                    </p>
                    <ul className="about-list">
                        <li>Compromisso</li>
                        <li>Qualidade</li>
                        <li>Integralidade</li>
                        <li>Bom senso</li>
                    </ul>
                    <a href="#partners" className="button">
                        <BiArrowToRight className="about-icon" />
                    </a>
                </div>
            </div>
        </section>
    );
}
