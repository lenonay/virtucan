import fs from "node:fs/promises";
import { ValidateQueja } from "../utils/validate.js";
import { EnviarMail } from "./mail.js";

const pwd = process.cwd();

export class LocalDB {
    static async register(body, ip) {

        // Validamos el cuerpo para evitar fugas
        const validate = ValidateQueja(body);
        if (validate.status !== "OK") {
            return validate
        }

        // Recuperar el TIME
        const time = new Date();

        // Formar el log
        const log = `IP=${ip}|TIME=${time.toISOString()}|BODY=${JSON.stringify(body)}\n`;

        // Registar el log de la peticion
        fs.writeFile(`${pwd}/logs/quejas.txt`, log, { flag: "a+" });

        // Enviar el correo
        const MailResult = EnviarMail(body);

        // Borrar los ficheros
        
        return MailResult;
    }
}