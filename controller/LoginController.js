import jwt from "jsonwebtoken";

import { LocalDB } from "../models/localDB.js";
import { JWT_PASS } from "../config.js";

export class LoginController {
    static async Login(req, res) {
        // Sacamos el usuario y la constraseña del cuerpo
        const { user, passwd } = req.body;
        // si no hay lo devolvemos
        if (!user || !passwd) {
            res.send({ status: "error", error: "Se requiere usuario y contraseña" });
        }

        // Revisamos si el usuario existe en la DB
        const DBresult = await LocalDB.CheckUser(user, passwd);

        // Si hay error retornamos el error
        if (DBresult.status !== "OK") {
            res.send({ status: "error", error: "Usuario o contraseña inválida" });
        }

        // Creamos el JWT y lo firmamos
        const token = jwt.sign(DBresult.user_data, JWT_PASS, {
            expiresIn: "1h"
        });

        // Enviamos la petición y metemos el token como cookie
        res
            .cookie("token", token,{
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60
            })
            .send({ status: "OK" ,msg: "correct auth"});
    }
}