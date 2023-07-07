import logo from "../images/logo.svg";
import React from "react";
import {Routes, Route, Link} from "react-router-dom";

export default function Header({isLogin, userEmail, isLogout}) {
        return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта"/>
            <div className="header__menu">
                {isLogin && <p className="header__email">{userEmail}</p>}
                <Routes>
                    <Route
                        path="/sign-up"
                        element={<Link to="/sign-in" className="header__menu-link">Войти</Link>}
                    />
                    <Route
                        path="/sign-in"
                        element={<Link to="/sign-up" className="header__menu-link">Регистрация</Link>}
                    />
                </Routes>
                {isLogin && <Link to="/sign-in" className="header__menu-link" onClick={isLogout}>Выйти</Link>}
            </div>
        </header>

    );
}