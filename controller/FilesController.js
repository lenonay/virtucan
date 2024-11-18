import fs from "node:fs";

import { UPLOAD_ROUTE } from "../config.js";
import { CreatePFP } from "../models/createPFP.js";

export class FilesController {
    static Get_PFP(req, res) {
        const { user } = req.session;

        // recuperamos todos los ficheros de la carpeta upload y los filtramos por el user
        const ficheros = fs.readdirSync(UPLOAD_ROUTE);
        const filtrado = ficheros.filter(file => file.includes(user));

        // Si hay mas de 1 borramos todos, creamos uno nuevo y lo enviamos
        if (filtrado.length > 1) {

            // Eliminamos todos los ficheros
            filtrado.forEach(file => {
                const path = UPLOAD_ROUTE + file;

                try {
                    fs.unlinkSync(path);
                } catch { }
            })

            const pfp_route = CreatePFP(user);
            res.sendFile(pfp_route, { root: "./" });

            return;
        }

        // Si no hay ninguno con el usuario, se crea uno y se envia
        if (filtrado.length === 0) {
            const pfp_route = CreatePFP(user);
            res.sendFile(pfp_route, { root: "./" });

            return;
        }

        // Si solo hay uno lo enviamos
        const path = UPLOAD_ROUTE + filtrado[0];

        res.sendFile(path, { root: "./" });
    }

    static Delete_User_PFP(user) {

        // Recuperamos todos los archivos de la ruta
        const dirElements = fs.readdirSync(UPLOAD_ROUTE);

        // Filtramos por los que contienen el nombre del usuario
        const filtered = dirElements.filter(elemento => elemento.includes(user));

        // Si no hay ninguno salimos
        if (!filtered) return;

        filtered.forEach(file => {
            const path = UPLOAD_ROUTE + file;
            try {
                fs.unlinkSync(path);
            } catch { }
        });

    }

    static Upload_User_PFP(req, res) {

        if (!req.file) {
            res.json({ status: "error", error: "No se pudo subir el archivo" });
            return
        }

        res.json({ status: "OK", filaname: req.file.filaname });
    }

    static Get_Attach(req, res) {
        const { id } = req.params;

        // Si no existe el archivo solicitado enviamos uno de error
        if (!fs.existsSync(`${UPLOAD_ROUTE}${id}`)) {
            res.sendFile("no-data.png", { root: "./public" });
            return;
        }

        res.sendFile(id, { root: UPLOAD_ROUTE });

    }

    static Get_All_Filenames(req, res) {
        let files = fs.readdirSync(UPLOAD_ROUTE);

        files = files.filter(file => file.startsWith("file-"));

        res.send(files);
    }

    static DeleteFile(req, res) {
        const { id } = req.params;
        // Creamos la ruta del fichero
        const path = UPLOAD_ROUTE + id;

        // Si no existe el fichero retornamos 
        if (!fs.existsSync(path)) {
            res.send({ status: "error", msg: "El archivo ya no existe" });
            return
        }

        // Intentamos borrar el fichero
        try {
            fs.unlinkSync(path);
            // Mandamos la confirmación
            res.send({ status: "OK", msg: "Archivo borrado con éxito", id: id });
        } catch {
            // Enviamos el error
            res.send({ status: "error", msg: "El archivo no se pudo eliminar" });
        }
    }
}