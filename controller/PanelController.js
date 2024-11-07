import { JSONFilePreset } from "lowdb/node";
const date_rgx = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

const db = await JSONFilePreset("./db.json", { quejas: [] });

export class PanelController {
    static async QuejasByDate(req, res) {
        const { filtro } = req.params;

        if (!date_rgx.test(filtro)){
            res.send({status: "error", error: "La fecha no cumple el formato"});
            return;
        }

        // Recuperamos todos las quejas de esa fecha
        const filtered_quejas = db.data.quejas.filter((queja) =>  queja.date === filtro );

        // Las enviamos
        res.send(filtered_quejas);
        
    }
}