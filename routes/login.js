import { Router } from "express";

import { LoginController } from "../controller/LoginController.js";

export const LoginRouter = Router();

LoginRouter.get("/", (req, res) => {
    res.sendFile("login.html", { root: "./views" });
})

LoginRouter.post("/", LoginController.Login);