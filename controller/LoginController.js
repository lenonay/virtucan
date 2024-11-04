import jwt from "jsonwebtoken";

import { LocalDB } from "../models/localDB.js";
import { JWT_PASS } from "../config.js";

export class LoginController {
    static async Login(req, res) {
        const { user, passwd } = req.body;
        // si no hay lo devolvemos
        if (!user || !passwd) {
            res.send({ status: "error", error: "Se requiere usuario y contraseña" });
        }

        const DBresult = await LocalDB.CheckUser(user, passwd);

        if (DBresult.status !== "OK") {
            res.send({ status: "error", error: "Usuario o contraseña inválida" });
        }

        const { DBuser, DBpriv } = DBresult.user_data;
        // Creamos el JWT
        const token = jwt.sign({ user: DBuser, priv: DBpriv }, JWT_PASS, {
            expiresIn: "1h"
        });
        res.send(token);
    }
}