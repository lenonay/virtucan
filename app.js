import express, { json } from 'express'
import { DepsRouter } from "./routes/deps.js";
import { QuejaRouter } from "./routes/quejas.js";
import { PORT } from './config.js';
import { UploadsRouter } from './routes/upload.js';

// Inicialiazamo el proceso

const app = express();

app.use(json());
app.disable("x-powered-by");

app.use("/deps", DepsRouter);

app.use("/upload", UploadsRouter);

app.get("/favicon.ico", (req, res) => res.sendFile("virtucan.png", { root: "./public" }));

app.get("/", (req, res) => {
    res.sendFile("quejas.html", { root: "./views" });
});

app.use("/queja", QuejaRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
})