import { configDotenv } from "dotenv";
import express, { json } from 'express'
import { DepsRouter } from "./routes/deps.js";

// Inicialiazamo el proceso
configDotenv();
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(json());
app.disable("x-powered-by");

app.use("/deps", DepsRouter);

app.get("/", (req, res) =>{
    res.sendFile("main.html", {root: "./views"});
});

app.listen(PORT, () =>{
    console.log("Server is listening on port: ",PORT);
})