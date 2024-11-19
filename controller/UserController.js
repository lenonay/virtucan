import { JSONFilePreset } from "lowdb/node";

export class UserController {
    static async GetUserInfo(req, res) {
        const { user } = req.session;
        const db = await JSONFilePreset("./db.json", { users: [] });

        const usersDB = db.data.users;

        const userData = usersDB.find(entry => entry.user === user);

        if (userData) {
            res.send({ status: "OK", data: userData });
        } else {
            res.send({ status: "error", error: "No se encontro el usuario" });
        }
    }
}