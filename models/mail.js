import nodemailer from "nodemailer";
import { MAIL, MAIL_PASS, PERS_MAIL } from "../config.js"
import { GenerateHTML } from "../utils/createHTML.js";

const transport = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
        user: MAIL,
        pass: MAIL_PASS
    }
});

export function EnviarMail(cuerpo) {
    try {
        const html = GenerateHTML(cuerpo);

        transport.sendMail({
            from: MAIL,
            to: PERS_MAIL,
            subject: `${cuerpo.motivo} | ${cuerpo.queja}`,
            html: html
        });

        // Devolver estatus
    } catch (e) {
        // Devolver error
        return { status: "error", error: "Email cannot send" , msg: e }
    }
    return { status: "OK", msg: "Email send" }
}