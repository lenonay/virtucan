import { Router } from 'express';

export const DepsRouter = Router();

DepsRouter.get("/css/main.css", (req, res) =>{
    try {
        res.sendFile("css/main.css",{root: "./deps"});
    }catch (e) {
        res.status(500).send({
            error: "No se pudo encontrar el archivo"
        });
    }
});

DepsRouter.get("/js/main.js", (req, res) =>{
    try {
        res.sendFile("js/main.js",{root: "./deps"});
    }catch (e) {
        res.status(500).send({
            error: "No se pudo encontrar el archivo"
        });
    }
});