import { LocalDB } from "../models/local.js";

export class QuejaController {
    static async register(req, res) {

        const response = await LocalDB.register(req.body, ip);

        res.send(response);
    }
}