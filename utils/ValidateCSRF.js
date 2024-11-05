import jwt from "jsonwebtoken";

import { JWT_PASS } from "../config.js";

export function ValidateCSRF(_csrf, _csrf_cookie) {

    // Validamos que la cookie y el post contengan la misma información
    if (_csrf !== _csrf_cookie) {
        return { status: "error", error: "El token ha sido manipulado" }
    }

    try {
        // Intentamos verificar el token
        const token = jwt.verify(_csrf, JWT_PASS);

        // Validamos el tiempo
        const current_time = Math.floor(Date.now() / 1000);

        // Validamos la expiración por si acaso
        if (token.exp < current_time) {
            return { status: "error", error: "El token ha expirado" }
        }

        // Lo devolvemos
        return token;

    } catch (e) {
        // Temporalmente mostramos el error
        return { status: "error", error: "Token inexistente" }
    }
}