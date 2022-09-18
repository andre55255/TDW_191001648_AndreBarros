import React from "react";
import "./SectionPartners.css";
import { BiArrowToRight } from "react-icons/bi";

export default function SectionPartners() {
    return (
        <section
            id="partners"
            className="partners-container main-container main-grid"
        >
            <div className="partners-data">
                <h1 className="partners-title">
                    Nossos
                    <span className="partners-title-secondary">Parceiros</span>
                </h1>
                <p className="partners-subtitle">
                    Nossos parceiros são o nosso tesouro
                </p>
                <div className="partners-list-container">
                    <div className="partners-list">
                        <span className="partners-icons-title">Apple</span>
                        <a href="#/" className="button-secondary">
                            Saber mais
                            <BiArrowToRight />
                        </a>
                    </div>
                    <div className="partners-list">
                        <span className="partners-icons-title">Google</span>
                        <a href="#/" className="button-secondary">
                            Saber mais
                            <BiArrowToRight />
                        </a>
                    </div>
                    <div className="partners-list">
                        <span className="partners-icons-title">Microsoft</span>
                        <a href="#/" className="button-secondary">
                            Saber mais
                            <BiArrowToRight />
                        </a>
                    </div>
                    <div className="partners-list">
                        <span className="partners-icons-title">Amazon</span>
                        <a href="#/" className="button-secondary">
                            Saber mais
                            <BiArrowToRight />
                        </a>
                    </div>
                    <div className="partners-list">
                        <span className="partners-icons-title">AMD</span>
                        <a href="#/" className="button-secondary">
                            Saber mais
                            <BiArrowToRight />
                        </a>
                    </div>
                    <div className="partners-list">
                        <span className="partners-icons-title">Intel</span>
                        <a href="#/" className="button-secondary">
                            Saber mais
                            <BiArrowToRight />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
