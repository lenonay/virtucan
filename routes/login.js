import { Router } from "express";

import { LoginController } from "../controller/LoginController.js";
import { csrf } from "../middlewares/csrf.js";

export const LoginRouter = Router();

// Middleware para generar el csrf_token
LoginRouter.get("*", csrf);

LoginRouter.get("/", (req, res) => {
    res.sendFile("login.html", { root: "./views" });
})


LoginRouter.post("/", LoginController.Login);