import crypto from "node:crypto";
import { JSONFilePreset } from "lowdb/node";

// Recuperar el TIME
const date = new Date();
const formatter_date = new Intl.DateTimeFormat("es-ES", { dateStyle: "short" });
const formatter_time = new Intl.DateTimeFormat("es-ES", { timeStyle: "short" });

export async function RegisterAction(_action){
    // Cargamos la base de datos
    const db = await JSONFilePreset("./db.json", { acciones: [] });

    // Formateamos la fecha de manera correcta
    const fecha = formatter_date.format(date) + "-" + formatter_time.format(date);

    // Creamos la accion a registrar
    const actionToRegister = {
        _id: crypto.randomUUID(),
        timestamp: fecha,
        userID: _action.userID,
        msg: _action.msg
    };

    // La metemos a la base de datos
    db.update(({acciones}) => { acciones.push(actionToRegister) });
}