import { Router } from "express";

import { authorize } from "../middlewares/authorize.js";

export const PanelRouter = Router();

PanelRouter.use(authorize);

PanelRouter.get("/", (req, res) => {
    res.sendFile("panel.html", { root: "./views" });
});