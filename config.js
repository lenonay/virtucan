import fs from "node:fs";
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
    "jpeg", "gif",
    "pdf"
]

// Las tablas que contiene la db local 
const db_tables = [
    "users", "quejas"
]

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
        if(!data[table]){
            data[table] = [];
        }
    });

    // Guardamos los cambios
    fs.writeFileSync("./db.json", JSON.stringify(data));
    
}