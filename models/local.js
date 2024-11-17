import crypto from "node:crypto";
import { JSONFilePreset } from "lowdb/node";


import { ValidateQueja } from "../utils/validate.js";
import { EnviarMail } from "./mail.js";


export class LocalDB {
    static async register(body, ip) {
        // Cargamos la DB por cada peticion
        const db = await JSONFilePreset("./db.json", { quejas: [] });

        // Validamos el cuerpo para evitar fugas
        const validate = ValidateQueja(body);
        if (validate.status !== "OK") {
            return validate;
        }

        // Recuperar el TIME
        const date = new Date();
        const formatter_date = new Intl.DateTimeFormat("es-ES", { dateStyle: "short" });
        const formatter_time = new Intl.DateTimeFormat("es-ES", { timeStyle: "short" });

        // Creamos el JSON para la DB
        const queja = {
            id: crypto.randomUUID(),
            user: body.user,
            date: formatter_date.format(date),
            time: formatter_time.format(date),
            email: body.email,
            motivo: body.motivo,
            queja: body.queja,
            asignatura: body.asignatura,
            titulo: body.titulo,
            cuerpo: body.cuerpo,
            files: body.files
        }

        // Lo metemos a la db
        await db.update(({ quejas }) => { quejas.push(queja) });

        // Enviar el correo
        const MailResult = await EnviarMail(body);

        return MailResult;
    }
}