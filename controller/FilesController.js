import fs from "node:fs";

import { UPLOAD_ROUTE } from "../config.js";
import { CreatePFP } from "../models/createPFP.js";

export class FilesController {
    static Get_PFP(req, res) {
        const { user } = req.session;

        const pfp_route = `${UPLOAD_ROUTE}pfp-${user}.png`;

        // Verificamos que tenga una foto ya
        if (!fs.existsSync(pfp_route)) {
            // Obtener imagen random
            CreatePFP(user);
        }

        res.sendFile(pfp_route, { root: "./" });
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
            res.send({status: "OK", msg: "Archivo borrado con éxito", id: id});
        } catch {
            // Enviamos el error
            res.send({status: "error", msg: "El archivo no se pudo eliminar"});
        }
    }
}