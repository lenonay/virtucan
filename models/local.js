import fs from "node:fs/promises";
import { ValidateQueja } from "../utils/validate.js";
import { EnviarMail } from "./mail.js";

const pwd = process.cwd();

export class LocalDB {
    static async register(body , ip){

        // Validamos el cuerpo para evitar fugas
        const validate = ValidateQueja(body);
        if(validate.status !== "OK") {
            return validate
        }

        // Formar el log
        const log = `IP=${ip}|BODY=${JSON.stringify(body)}\n`;

        // Registar el log de la peticion
        fs.writeFile(`${pwd}/logs/quejas.txt`, log, { flag: "a+" });

        // Enviar el correo
        EnviarMail(body);

        return { pinga: "OK" }
    }
}