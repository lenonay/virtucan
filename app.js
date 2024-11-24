import express, { json } from 'express'
import cookieParser from 'cookie-parser';
import fs from "node:fs";

// Parametros de configuracion
import { PORT } from './config.js';
// Middleware
import { token } from './middlewares/jwt.js';
// Routers
import { DepsRouter } from "./routes/deps.js";
import { QuejaRouter } from "./routes/quejas.js";
import { UploadsRouter } from './routes/upload.js';
import { LoginRouter } from './routes/login.js';
import { PanelRouter } from './routes/panel.js';
import { FilesRouter } from './routes/files.js';
import { UserRouter } from './routes/user.js';

// Inicialiazamo el proceso
// Metemos todo en bloque try catch para ver que es el error que cierra el servicio
try {
    const app = express();

    app.use(json());
    app.use(cookieParser());
    app.use(token);

    app.disable("x-powered-by");

    app.use("/deps", DepsRouter);

    app.use("/upload", UploadsRouter);

    app.get("/favicon.ico", (req, res) => res.sendFile("noni_logo.png", { root: "./public" }));

    app.get("/", (req, res) => {
        res.sendFile("quejas.html", { root: "./views" });
    });

    app.use("/login", LoginRouter)

    app.use("/panel", PanelRouter);

    app.use("/queja", QuejaRouter);

    app.use("/files", FilesRouter);

    app.use("/user", UserRouter);

    app.listen(PORT, () => {
        console.log("Server is listening on port: ", PORT);
    })
} catch (e) {
    console.log(e);
    try {
        // Guardamos el error en un log
        fs.writeFile("./logs/errores.txt", `${e}\n\n`, { flag: "a+" });
    } catch { }
}