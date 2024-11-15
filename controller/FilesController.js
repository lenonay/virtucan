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
}