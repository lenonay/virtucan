import fs from "node:fs";
import { randomUUID } from "node:crypto";

import bcrypt from "bcrypt";
import z from "zod";

import { JSONFilePreset } from "lowdb/node";
import { configDotenv } from "dotenv";
configDotenv();

// Variables de entorno (.env)
export const {
    PORT,
    MAIL,
    MAIL_PASS,
    PERS_MAIL,
    UPLOAD_ROUTE,
    DEFAULT_USER,
    JWT_PASS
} = process.env;

// Extensiones permitidas en la subida de archivos adjuntos
export const allowed_exts = [
    "jpg", "png",
    "jpeg", "gif"
]

// Las tablas que contiene la db local 
const db_tables = [
    "users", "quejas"
]

const UserSchema = z.object({
    user: z.string({ message: "Se requiere el usuario" }).min(4, { message: "El usuario debe ser mayor de 5 carácteres" }),
    email: z.string({message: "Se requiere un email"}).email({message: "El email no es válido"}),
    priv: z.enum(["user", "admin", "master"]).catch("user"),
    asignaturas: z.array(z.string()).catch([]),
    extras: z.string().optional().default(""),
    notify: z.boolean().catch(false)
}).strict();

export const ValidateUser = (UserObject) => {
    const resultado = UserSchema.safeParse(UserObject);

    if(resultado.success){
        return { status: "OK", msg: "Usuario válido" };
    }else{
        const error_msgs = resultado.error.errors.map(error => error.message);

        return {status: "error", errores: error_msgs};
    }
}

// Inicializar la DB en caso de que no exista
if (!fs.existsSync("./db.json")) {

    // Inicializamos un objeto
    let default_body = {}

    // Iteramos por cada tabla y la inicializamos como array vacío
    db_tables.forEach(table => {
        default_body[table] = [];
    })

    // Escribimos el fichero de la DB
    fs.writeFileSync("./db.json", JSON.stringify(default_body));
}
// Si ya existe verficamos que tenga todas las tablas
else {
    // Obtenemos la información
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    // Si no esta la tabla la añadimos
    db_tables.forEach(table => {
        // Si no esta la tabla la inicialiazmos
        if (!data[table]) {
            data[table] = [];
        }
    });

    // Guardamos los cambios
    fs.writeFileSync("./db.json", JSON.stringify(data));

    const db = await JSONFilePreset("./db.json", { users: [] });

    if (db.data.users.length === 0) {
        const hash = await bcrypt.hash(DEFAULT_USER, 10);
        await db.update(({ users }) => {
            users.push(
                {
                    id: randomUUID(), 
                    user: DEFAULT_USER,
                    passwd: hash,
                    email: PERS_MAIL,
                    priv: "master",
                    asignaturas: "",
                    extra: "",
                    notify: false
                })
        });
    }

}