import { JSONFilePreset } from "lowdb/node";
const date_rgx = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}$/;


export class PanelController {
    static async QuejasByDate(req, res) {
        const db = await JSONFilePreset("./db.json", { quejas: [] });
        
        // Recuperamos una copia de la db 
        let quejas = db.data.quejas;

        // Recogemos los filtros
        const { fecha, id } = req.query;

        if (id){
            quejas = quejas.filter(quejas => quejas.id === id);
        }

        // Si hay fecha filtramos por ella
        if (fecha && date_rgx.test(fecha)) {
            quejas = quejas.filter(queja => queja.date === fecha);
        }

        // Enviamos las quejas filtradas
        res.send(quejas);
    }
}