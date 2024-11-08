import { Router } from "express";

import { authorize } from "../middlewares/authorize.js";
import { PanelController } from "../controller/PanelController.js";

export const PanelRouter = Router();

PanelRouter.use(authorize);

PanelRouter.get("/", (req, res) => {
    res.sendFile("panel.html", { root: "./views" });
});

PanelRouter.get("/quejas", PanelController.QuejasByDate);