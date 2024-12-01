import fs from "node:fs";

import { UPLOAD_ROUTE } from "../config.js";
import { CreatePFP } from "../models/createPFP.js";
import { RegisterAction } from "../utils/actions.js";

export class FilesController {
    static Get_PFP(req, res) {
        const { id } = req.session;

        // recuperamos todos los ficheros de la carpeta upload y los filtramos por el user
        const ficheros = fs.readdirSync(UPLOAD_ROUTE);
        const filtrado = ficheros.filter(file => file.includes(id));

        // Si hay mas de 1 borramos todos, creamos uno nuevo y lo enviamos
        if (filtrado.length > 1) {

            // Eliminamos todos los ficheros
            filtrado.forEach(file => {
                const path = UPLOAD_ROUTE + file;

                try {
                    fs.unlinkSync(path);
                } catch { }
            })

            const pfp_route = CreatePFP(id);
            res.sendFile(pfp_route, { root: "./" });

            return;
        }

        // Si no hay ninguno con el usuario, se crea uno y se envia
        if (filtrado.length === 0) {
            const pfp_route = CreatePFP(id);
            res.sendFile(pfp_route, { root: "./" });

            return;
        }

        // Si solo hay uno lo enviamos
        const path = UPLOAD_ROUTE + filtrado[0];

        res.sendFile(path, { root: "./" });
    }

    static DeleteOwnPFP(req, res) {
        // Sacamos la id de la petición
        const { id, user } = req.session;

        // Eliminamos el usuario
        const operacion = Delete_User_PFP(id);

        // Si la operación no salio existosa mandamos error
        if(!operacion){
            res.send({status: "error", error: "No se pudo eliminar la foto"});
            return;
        }

        // De resto enviamos un OK
        res.send({status: "OK"});

        RegisterAction({
            userID: id,
            msg: `${user} ha borrado su foto de perfil`
        });
    }

    static Upload_User_PFP(req, res) {

        if (!req.file) {
            res.json({ status: "error", error: "No se pudo subir el archivo" });
            return
        }

        res.json({ status: "OK", filaname: req.file.filaname });

        RegisterAction({
            userID: req.session.id,
            msg: `${req.session.user} ha subido una foto de perfil`
        });
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

export function Delete_User_PFP(id) {
    // Recuperamos todos los archivos de la ruta
    const dirElements = fs.readdirSync(UPLOAD_ROUTE);

    // Filtramos por los que contienen el nombre del usuario
    const filtered = dirElements.filter(elemento => elemento.includes(id));

    // Si no hay ninguno salimos
    if (!filtered) return;

    filtered.forEach(file => {
        const path = UPLOAD_ROUTE + file;
        try {
            fs.unlinkSync(path);
        } catch { }
    });

    return true;
}