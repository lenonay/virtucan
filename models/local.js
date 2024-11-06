import fs from "node:fs/promises";
import { JSONFilePreset } from "lowdb/node";

import { ValidateQueja } from "../utils/validate.js";
import { EnviarMail } from "./mail.js";

const pwd = process.cwd();

const db = await JSONFilePreset("./db.json", { quejas: [] });

export class LocalDB {
    static async register(body, ip) {

        // Validamos el cuerpo para evitar fugas
        const validate = ValidateQueja(body);
        if (validate.status !== "OK") {
            return validate
        }

        // Recuperar el TIME
        const time = new Date();

        // Creamos el JSON para la DB
        const queja = {
            user: body.user,
            date: time.toLocaleDateString(),
            time: time.toLocaleTimeString(),
            email: body.email,
            motivo: body.motivo,
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