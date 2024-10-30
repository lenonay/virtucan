import nodemailer from "nodemailer";
import fs from "node:fs";

import { MAIL, MAIL_PASS, PERS_MAIL, UPLOAD_ROUTE } from "../config.js"
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

export async function EnviarMail(cuerpo) {
    try {
        const html = GenerateHTML(cuerpo);

        const { files } = cuerpo;

        let attachments = [];

        if (files) {
            for (const file of files) {
                attachments.push({
                    path: `${process.cwd()}/uploads/${file}`
                });
            }
        }

        await transport.sendMail({
            from: MAIL,
            to: PERS_MAIL,
            subject: `${cuerpo.motivo} | ${cuerpo.queja}`,
            html: html,
            attachments,
        });

    } catch (e) {
        // Devolver error
        return { status: "error", error: "Email cannot send", msg: e }
    }
    return { status: "OK", msg: "Email send" }
}