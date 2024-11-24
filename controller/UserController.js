import { JSONFilePreset } from "lowdb/node";

import { ValidateUser } from "../config.js";

export class UserController {
    static async GetUserInfo(req, res) {
        // Recuperamos el usuario
        const { user } = req.session;
        // Recuperamos la base de datos
        const db = await JSONFilePreset("./db.json", { users: [] });

        // Obtenemos los datos del usuario
        const userDataDB = db.data.users.find(entry => entry.user === user);

        // Si hay datos del usuario
        if (userDataDB) {
            // Quitamos la contraseña de los datos a enviar
            const { passwd: _, ...userData } = userDataDB;
            res.send({ status: "OK", data: userData });
        } else {
            // Si no se encuentra el usuario enviamos un error
            res.send({ status: "error", error: "No se encontro el usuario" });
        }
    }

    static async UpdateOwnUser(req, res) {
        // Validamos los datos del usuario
        const data = req.body;
        const { id } = req.session;

        // Validamos contra el esquema
        const validacion = ValidateUser(data);

        // Si la validacion no es correcta devolvemos con los errores
        if (validacion.status !== "OK") {
            res.send(validacion);
            return;
        }

        // Recuperamos los datos de los usuarios
        const db = await JSONFilePreset("./db.json", { users: [] });

        // Recuperamos el indice de nuestro usuario
        const indice = db.data.users.findIndex(entry => entry.id === id);

        // Cambiamos los datos
        let userDB = db.data.users[indice];

        userDB.user = data.user
        userDB.email = data.email;
        userDB.asignaturas = data.asignaturas;
        userDB.extras = data.extras;
        userDB.notify = data.notify;

        // Guardamos los cambios
        try {
            await db.write();

            res.send({ status: "OK" });
        } catch {
            res.send({ status: "error", error: "No se pudo enviar los datos" });
        }
    }
}