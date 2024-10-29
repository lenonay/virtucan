export class UploadController {
    static async Upload(req, res) {

        if(!req.file){
            res.json({ status: "Error", error: "No se pudo subir el fichero" });
        }

        res.json({ status: "OK", filename: req.file.filename });
    }
}