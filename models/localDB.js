import { JSONFilePreset } from "lowdb/node";
import bcrypt from "bcrypt";

const db = await JSONFilePreset("./db.json", { users: [] });

if(!db.data.users){
    db.data.users = [];
    db.write();
}

// Si esta vacío metemos uno por defecto
if (db.data.users.length === 0) {
    const hash = await bcrypt.hash("123456",10);
    await db.update(({ users }) => { users.push({ id: 1, user: "nonay", passwd: hash }) });
}

export class LocalDB {
    static async CheckUser(user, passwd) {
        const { users } = db.data;

        const DBuser = users.find((entry) => entry.user === user);

        if(!DBuser){
            return { status: "error", msg: "El usuario no existe" }
        }

        if(!bcrypt.compareSync(passwd, DBuser.passwd)){
            return { status: "error", msg: "contraseña invalida" }
        }

        return { status: "OK", msg: "usuario existente" }
    }
}