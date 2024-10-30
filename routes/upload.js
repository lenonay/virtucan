import { Router } from "express";
import multer from "multer";
import path from "path";

import { UPLOAD_ROUTE } from "../config.js";
import { UploadController } from "../controller/UploadController.js";
import { allowed_exts } from "../config.js";

export const UploadsRouter = Router();

const storage = multer.diskStorage({
    destination: UPLOAD_ROUTE,
    filename: (req, file, cb) => {
        const suffix = Math.random().toString(16).replace(/0\./, "file-");
        const ext = path.extname(file.originalname);
        cb(null, suffix+ext);
    },
});

const fileFilter = (req, file, cb) =>{
    const extension = path.extname(file.originalname).slice(1).toLowerCase();

    if(!allowed_exts.some(ext => extension.includes(ext))){
        return cb(new Error("Extension Invalida"), false);
    }
    else{
        cb(null,true);
    }
}

const upload = multer({ storage, fileFilter });

UploadsRouter.post("/", upload.single("file"), UploadController.Upload);

UploadsRouter.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Errores específicos de multer
        return res.json({ error: err.message });
    } else if (err) {
        // Otros errores
        return res.json({ error: err.message });
    }
    next();
});