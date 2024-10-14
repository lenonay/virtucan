import nodemailer from "nodemailer";
import { MAIL, MAIL_PASS, PERS_MAIL } from "../config.js"

const transport = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
        user: MAIL,
        pass: MAIL_PASS
    }
});

export function EnviarMail(cuerpo){
    try {
        transport.sendMail({
            from: MAIL,
            to: PERS_MAIL,
            subject: `${cuerpo.motivo} | ${cuerpo.queja}`,
            text: cuerpo.cuerpo
        });
    } catch (e) {
        console.log(e);
    } 
}