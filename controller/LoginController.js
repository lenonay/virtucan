import { LocalDB } from "../models/localDB.js";

export class LoginController {
    static async Login(req, res) {
        const { user, passwd } = req.body;
        // si no hay lo devolvemos
        if (!user || !passwd) {
            res.send({ status: "error", error: "Se requiere usuario y contraseña" });
        }

        const existe = await LocalDB.CheckUser(user, passwd);

        res.send({ status: "OK" , existe: existe});
    }
}