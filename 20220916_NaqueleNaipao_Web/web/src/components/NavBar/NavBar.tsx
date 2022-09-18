import React from "react";
import logoHorizontal from "../../assets/logoHorizontalFundoBrancoAdjusted.png";
import { BiX, BiMenu } from "react-icons/bi";
import "./NavBar.css";

export default function NavBar() {
    (function () {
        const navMenu = document.getElementById("nav-menu");
        const navToggle = document.getElementById("nav-toggle");
        const navClose = document.getElementById("nav-close");

        if (navToggle) {
            navToggle.addEventListener("click", (e) => {
                navMenu?.classList.add("show-menu");
            });
        }

        if (navClose) {
            navClose.addEventListener("click", () => {
                navMenu?.classList.add("show-menu");
            });
        }

        const collapseMenuMobile = function () {
            const navMenu = document.getElementById("nav-menu");
            navMenu?.classList.remove("show-menu");
        };
        navMenu?.addEventListener("click", collapseMenuMobile);
    })();

    return (
        <nav className="nav container">
            <div className="nav-box">
                <a href="#/" className="nav-logo">
                    <img src={logoHorizontal} alt="Logo" />
                </a>
            </div>
            <div className="nav-menu" id="nav-menu">
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="#home" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link">
                            Sobre
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#partners" className="nav-link">
                            Parceiros
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link">
                            Contato
                        </a>
                    </li>
                </ul>
                <div className="nav-close" id="nav-close">
                    <BiX />
                </div>
            </div>
            <div className="nav-btns">
                <div className="nav-toggle" id="nav-toggle">
                    <BiMenu />
                </div>
            </div>
        </nav>
    );
}
