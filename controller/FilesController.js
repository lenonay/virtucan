import fs from "node:fs";

import { UPLOAD_ROUTE } from "../config.js";
import { CreatePFP } from "../models/createPFP.js";

export class FilesController {
    static Get_PFP(req, res) {
        const { user } = req.session;

        const pfp_route = `${UPLOAD_ROUTE}pfp-${user}.png`;

        // Verificamos que tenga una foto ya
        if(!fs.existsSync(pfp_route)){
            // Obtener imagen random
            CreatePFP(user);
        }

        res.sendFile(pfp_route, { root: "./" });
    }
}