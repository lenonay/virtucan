import { JSONFilePreset } from "lowdb/node";
const date_rgx = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}$/;


export class PanelController {
    static async QuejasByDate(req, res) {
        const db = await JSONFilePreset("./db.json", { quejas: [] });

        // Recuperamos una copia de la db 
        let quejas = db.data.quejas;

        // Recogemos los filtros
        const { fecha, id } = req.query;

        // Filtramos por ID
        if (id) {
            quejas = quejas.filter(quejas => quejas.id === id);
        }

        // Si hay fecha filtramos por ella
        if (fecha && date_rgx.test(fecha)) {
            quejas = quejas.filter(queja => queja.date === fecha);
        }

        // Enviamos las quejas filtradas
        res.send(quejas);
    }

    static async DeleteQueja(req, res) {
        // Si no hay id mandamos el error
        const { id } = req.params;
        if (!id) {
            res.send({ status: "error", msg: "El ID es requerido" });
            return;
        }

        // Cargamos la base de datos
        const db = await JSONFilePreset("./db.json", { quejas: [] });

        // Guardamos una copia de las quejas
        const quejas_old = db.data.quejas;

        // Guardamos todas las quejas que no coincidan con el id que queremos eliminar
        const quejas_filtered = quejas_old.filter(queja => queja.id !== id);

        // Si la copia es igual a las filtradas no se ha eliminado nada
        if (quejas_old === quejas_filtered) {
            res.send({ status: "error", msg: "No se ha eliminado la queja" });
            return;
        }

        // Guardamos los cambios en la db
        db.data.quejas = quejas_filtered;
        await db.write();

        res.send({ status: "OK", msg: "Se ha eliminado la queja" });
    }
}