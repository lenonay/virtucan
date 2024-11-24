import { JSONFilePreset } from "lowdb/node";
import bcrypt from "bcrypt";
// Si esta vacío metemos uno por defecto


export class LocalDB {
    static async CheckUser(user, passwd) {
        const db = await JSONFilePreset("./db.json", { users: [] });
        const { users } = db.data;

        // Buscamos el usuario para ver si existe
        const DBuser = users.find((entry) => entry.user === user);

        if (!DBuser) {
            // Si no existe retornamos error
            return { status: "error", msg: "El usuario no existe" }
        }

        if (!bcrypt.compareSync(passwd, DBuser.passwd)) {
            // Si la contrasña no coincide retornamos error
            return { status: "error", msg: "contraseña invalida" }
        }

        const user_data = {
            id: DBuser.id,
            user: DBuser.user,
            priv: DBuser.priv
        }

        // Caso contrario existe retornamos OK
        return { status: "OK", msg: "usuario existente", user_data: user_data }
    }
}