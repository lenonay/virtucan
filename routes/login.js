import { Router } from "express";

export const LoginRouter = Router();

LoginRouter.get("/", (req, res) => {
    res.sendFile("login.html", { root: "./views" });
})

LoginRouter.post("/", (req, res) => {
    
    res.send(req.body);
})