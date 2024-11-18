import jwt from "jsonwebtoken";

import { LocalDB } from "../models/localDB.js";
import { JWT_PASS } from "../config.js";
import { ValidateCSRF } from "../utils/ValidateCSRF.js";

export class LoginController {
    static async Login(req, res) {
        // Sacamos el usuario y la constraseña del cuerpo
        const { user, passwd, _csrf } = req.body;

        // si no hay lo devolvemos
        if (!user || !passwd) {
            res.send({ status: "error", error: "Se requiere usuario y contraseña" });
            return;
        }

        // Revisamos si el usuario existe en la DB
        const DBresult = await LocalDB.CheckUser(user, passwd);

        // Si hay error retornamos el error
        if (DBresult.status !== "OK") {
            res.send({ status: "error", error: "Usuario o contraseña inválida" });
            return;
        }

        // Sacamos la cookie que contiene el csrf
        const csrf_cookie = req.cookies.csrf_token;

        // Sacamos la información del token sacado del body
        const csrf_token = ValidateCSRF(_csrf, csrf_cookie);

        // Si el csrf token tiene un error lo devolvemos
        if (csrf_token.status == "error") {
            res.send({ status: "error", error: csrf_token.error });
            return;
        }

        // Creamos el JWT y lo firmamos
        const token = jwt.sign(DBresult.user_data, JWT_PASS, {
            expiresIn: "1h"
        });

        // Enviamos la petición y metemos el token como cookie
        res
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60
            })
            .send({ status: "OK", msg: "Atenticación correcta" })
        ;
    }

    static async Logoff(req, res){
        // Borramos la cookie y madamos la confirmación
        res.clearCookie("token").send({status: "OK"});
    }
}