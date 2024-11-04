import express, { json } from 'express'
import cookieParser from 'cookie-parser';

import { DepsRouter } from "./routes/deps.js";
import { QuejaRouter } from "./routes/quejas.js";
import { PORT } from './config.js';
import { UploadsRouter } from './routes/upload.js';
import { LoginRouter } from './routes/login.js';

// Inicialiazamo el proceso

const app = express();

app.use(json());
app.use(cookieParser());
app.disable("x-powered-by");

app.use("/deps", DepsRouter);

app.use("/upload", UploadsRouter);

app.get("/favicon.ico", (req, res) => res.sendFile("virtucan.png", { root: "./public" }));

app.get("/", (req, res) => {
    res.sendFile("quejas.html", { root: "./views" });
});

app.use("/login", LoginRouter)

app.use("/queja", QuejaRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
})