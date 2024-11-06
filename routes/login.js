import { Router } from "express";

import { LoginController } from "../controller/LoginController.js";
import { csrf } from "../middlewares/csrf.js";

export const LoginRouter = Router();

// Middleware para generar el csrf_token
LoginRouter.get("*", csrf);

LoginRouter.get("/", (req, res) => {

    // Si ya ha iniciado sesión lo metemos al panel directo
    if(req.session){
        res.redirect("panel");
        return
    }

    res.sendFile("login.html", { root: "./views" });
})


LoginRouter.post("/", LoginController.Login);