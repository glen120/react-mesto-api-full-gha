import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Register({handleRegister}) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormValue({...formValue, [name]: value});
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleRegister(formValue);
    }

    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__form-label">
                    <input
                        className="login__input login__input_email"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        minLength="5"
                        maxLength="50"
                        value={formValue.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="login__form-label">
                    <input
                        className="login__input login__input_password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        minLength="4"
                        maxLength="20"
                        value={formValue.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" className="login__submit-button">Зарегистрироваться</button>
            </form>
            <p className="login__register-text">Уже зарегистрированы?
                <Link to="/sign-in" className="login__link"> Войти</Link>
            </p>
        </div>
    )
}