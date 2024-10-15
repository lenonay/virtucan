import { LocalDB } from "../models/local.js";

export class QuejaController {
    static async register(req, res){
        
        // IP
        const ip = req.socket.remoteAddress.split(":").pop();

        const response = await LocalDB.register(req.body, ip);

        res.send(response);
    }
}