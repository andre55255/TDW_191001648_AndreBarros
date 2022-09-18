import React from "react";
import logoHorizontal from "../../assets/logoHorizontalFundoBrancoAdjusted.png";
import "./Footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { BiArrowToRight } from "react-icons/bi";

export default function Footer() {
    return (
        <footer id="contact" className="footer section">
            <div className="footer-container container grid">
                <div className="footer-content">
                    <a href="#/" className="footer-logo">
                        <img
                            src={logoHorizontal}
                            alt="Logo"
                            className="footer-logo-img"
                        />
                    </a>

                    <p className="footer-description">
                        Uma empresa para trazer o seu pão de cada dia, feito com
                        muito amor e carinho
                    </p>

                    <div className="footer-social">
                        <a href="#/" target="_blank" className="footer-social-link">
                            <FaInstagram />
                        </a>
                        <a href="#/" target="_blank" className="footer-social-link">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="footer-title">Contato</h3>
                    <small>
                        <p className="footer-description">
                            Telefone: (31) 99999-9999
                            <br />
                            Email: naquelenaipao@uorak.com
                            <br />
                            Conselheiro Lafaiete - MG
                        </p>
                    </small>
                    <a href="#openModalSendMessage" className="button">
                        Enviar mensagem
                        <BiArrowToRight className="about_icon" />
                    </a>
                </div>
            </div>
            <hr className="hr-footer-secondary" />
            <span className="footer-copy">
                &copy; Copyright 2022 Naquele NaiPão
            </span>
        </footer>
    );
}
