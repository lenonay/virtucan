import { JSONFilePreset } from "lowdb/node";
import bcrypt from "bcrypt";

import { DEFAULT_USER } from "../config.js";

const db = await JSONFilePreset("./db.json", { users: [] });

// Si no existe la colección users la añadimos
if(!db.data.users){
    db.data.users = [];
    db.write();
}

// Si esta vacío metemos uno por defecto
if (db.data.users.length === 0) {
    const hash = await bcrypt.hash(DEFAULT_USER,10);
    await db.update(({ users }) => { users.push({ id: 1, user: DEFAULT_USER, passwd: hash }) });
}

export class LocalDB {
    static async CheckUser(user, passwd) {
        const { users } = db.data;

        // Buscamos el usuario para ver si existe
        const DBuser = users.find((entry) => entry.user === user);

        if(!DBuser){
            // Si no existe retornamos error
            return { status: "error", msg: "El usuario no existe" }
        }

        if(!bcrypt.compareSync(passwd, DBuser.passwd)){
            // Si la contrasña no coincide retornamos error
            return { status: "error", msg: "contraseña invalida" }
        }

        // Caso contrario existe retornamos OK
        return { status: "OK", msg: "usuario existente" }
    }
}