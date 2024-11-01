import { LocalDB } from "../models/local.js";
import fs from "node:fs";

export class QuejaController {
    static async register(req, res) {

        const { files } = req.body;

        // IP
        const ip = req.socket.remoteAddress.split(":").pop();

        const response = await LocalDB.register(req.body, ip);

        // Borrar los archivos
        if (files) {
            for (const file of files) {
                const path = process.cwd() + "/uploads/" + file;

                if(fs.existsSync(path)){
                    fs.unlinkSync(path);
                }
            }
        }

        res.send(response);
    }
}