import { Router } from "express";
import multer from "multer";
import path from "node:path";

import { authorize } from "../middlewares/authorize.js";
import { FilesController, Delete_User_PFP } from "../controller/FilesController.js";

import { UPLOAD_ROUTE, allowed_exts } from "../config.js";

export const FilesRouter = Router();

// Creamos el storage y guardamos el nombre del archivo
const storage = multer.diskStorage({
    destination: UPLOAD_ROUTE,
    filename: (req, file, cb) => {
        // Recuperamos el user y la extensión
        const { id } = req.session;
        const ext = path.extname(file.originalname);

        // Borramos los ficheros anteriores
        Delete_User_PFP(id);

        cb(null, "pfp-" + id + ext);
    }
});

// Construimos el filtro de ficheros
const fileFilter = (req, file, cb) => {

    // Revisar peso
    const size = req.headers["content-length"];

    if (size > 2000000) {
        return cb(new Error("Peso excedido", false));
    }

    const extension = path.extname(file.originalname).slice(1).toLowerCase();

    if (!allowed_exts.some(ext => extension.includes(ext))) {
        return cb(new Error("Extension Invalida"), false);
    }

    cb(null, true);
}

const pfp_upload = multer({ storage, fileFilter });

// Middleware para filtrar por sesiones
FilesRouter.use(authorize);

FilesRouter.get("/attachemnts", FilesController.Get_All_Filenames);

FilesRouter.get("/attachemnts/:id", FilesController.Get_Attach);

FilesRouter.delete("/attachemnts/:id", FilesController.DeleteFile);

FilesRouter.get("/pfp", FilesController.Get_PFP);

FilesRouter.post("/pfp", pfp_upload.single("new_pfp"), FilesController.Upload_User_PFP);

FilesRouter.delete("/pfp", FilesController.DeleteOwnPFP)

FilesRouter.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Errores específicos de multer
        return res.json({ status: "error", error: err.message });
    } else if (err) {
        // Otros errores
        return res.json({ status: "error", error: err.message });
    }
    next();
});