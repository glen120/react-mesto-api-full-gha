import {auth_url} from "./utils.js";

class Auth {
    constructor(url) {
        this._url = url;
    }

    // Проверяем результат запроса
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Произошла ошибка ${res.status}.`);
        }
    }

    // Регистрируем пользователя
    register(body) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res) => this._checkResponse(res));
    }

    // Авторизуем пользователя
    authorize(body) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res) => this._checkResponse(res));
    }

    // Валидируем токен
    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => this._checkResponse(res));
    }
}

const auth = new Auth(auth_url);

export default auth;
