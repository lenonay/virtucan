import { configDotenv } from "dotenv";
import express, { json } from 'express'
import { DepsRouter } from "./routes/deps.js";
import { QuejaRouter } from "./routes/quejas.js";

// Inicialiazamo el proceso
configDotenv();
const PORT = process.env.PORT ?? 80;

const app = express();

app.use(json());
app.disable("x-powered-by");

app.use("/deps", DepsRouter);

app.get("/favicon.ico", (req,res) => res.sendFile("virtucan.png", { root: "./public" }));

app.get("/", (req, res) =>{
    res.sendFile("quejas.html", {root: "./views"});
});

app.use("/queja", QuejaRouter);

app.listen(PORT, () =>{
    console.log("Server is listening on port: ",PORT);
})