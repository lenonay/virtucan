import { Router } from 'express';

export const DepsRouter = Router();

DepsRouter.get("/css/main.css", (req, res) => {
    try {
        res.sendFile("css/main.css", { root: "./deps" });
    } catch (e) {
        res.status(500).send({
            error: "No se pudo encontrar el archivo"
        });
    }
});

DepsRouter.get("/css/login.css", (req, res) => {
    res.sendFile("css/login.css", { root: "./deps" });
});

DepsRouter.get("/css/panel.css", (req, res) => {
    res.sendFile("css/panel.css", { root: "./deps" });
});

DepsRouter.get("/js/main.js", (req, res) => {
    try {
        res.sendFile("js/main.js", { root: "./deps" });
    } catch (e) {
        res.status(500).send({
            error: "No se pudo encontrar el archivo"
        });
    }
});

DepsRouter.get("/js/login.js", (req, res) => {
    res.sendFile("js/login.js", { root: "./deps" });
})

DepsRouter.get("/js/panel.js", (req, res) => {
    res.sendFile("js/panel.js", { root: "./deps" });
})