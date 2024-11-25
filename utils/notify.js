import { JSONFilePreset } from "lowdb/node";
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

export async function NotifyMembers(asignatura, body) {
    // Recuperamos una copia de la base de datos
    const db = await JSONFilePreset("./db.json", { users: [] });

    // Filtramos por aquellos que tengan esa asigntatura y notificar true
    const users = db.data.users.filter(entry => entry.asignaturas.includes(asignatura) && entry.notify);

    // Si no hay usuarios que cumplan la condicion salimos de la función
    if (users.length === 0) return;

    users.forEach(entry => {
        transport.sendMail({
            from: MAIL,
            to: entry.email,
            subject: `${body.motivo.charAt(0).toUpperCase() + body.motivo.slice(1)} | ${body.titulo}`,
            html: CrearHTML(body)
        });
    })

}

function CrearHTML(body) {
    return `
        <table
            style="width: 100%; text-align: center; min-width: 300px; color: #212121; font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 18px; padding: 10px; border-collapse: collapse;">
            <thead style="background: aliceblue;">
                <tr>
                    <th style="font-size: 28px;">Quejas 2º ASIR</th>
                </tr>
                <tr>
                    <th style="font-size: 22px; font-weight: 550;">
                        <span>${body.asignatura}</span>
                        <span>-</span>
                        <span style="text-transform: capitalize;">${body.motivo}</span>
                    </th>
                </tr>
            </thead>
            <tbody style="background: aliceblue;">
                <tr>
                    <td style="padding-top: 15px;">
                        <span style="font-weight: 600;">Título: </span>
                        <span>${body.titulo}</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: justify; font-size: 20px; padding: 20px 5px;">
                        ${body.cuerpo}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px 5px 30px 5px;">
                        <a href="https://quejas.virtucan.es/panel"
                            style="text-decoration: none; text-transform: uppercase; font-weight: 600; color: black; padding: 8px 12px; background: palevioletred; border-radius: 20px; border: none;">
                            Ver queja completa
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 16px; text-align: justify; font-style: italic; padding: 10px;">
                        ¡Importante! El panel solo esta diseñado para su uso en
                        escritorio, lamento las posibles molestias ocasionadas
                    </td>
                </tr>
            </tbody>
            <tfoot style="background-color: #373d3d; color: aliceblue;">
                <tr>
                    <td style="padding: 15px; font-size: 16px;">
                        Si quiere dejar de recibir estas notificaciones, tiene que seguir los siguientes
                        pasos:
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px; padding-top: 0; font-size: 16px;">
                        <ol style="width: fit-content; margin: auto; text-align: left;">
                            <li>Inicie sesión en el panel de quejas.</li>
                            <li>Dirigase a sus ajustes, haciendo click en su perfil.</li>
                            <li>Active el modo edición de sus datos personales.</li>
                            <li>Desmarque la casilla "Recibir notificaciones".</li>
                            <li>Guarde los cambios.</li>
                        </ol>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; text-align: justify; padding: 10px;">
                        Toda la información intercambiada en estos mensajes de correo electrónico es estrictamente
                        confidencial. Se ruega hacer un buen uso de la misma. Puesto que el propósito principal de esta
                        herramienta de quejas, es acercar las opiniones y pensamientos del alumnado al profesorado.
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding-top: 20px; padding-bottom: 10px;">
                        Si tiene alguna incidencia, por favor contacte a esta dirección: <span
                            style="font-weight: 550">${PERS_MAIL}</span>
                    </td>
                </tr>
            </tfoot>
        </table>
    `;
}