import { Router } from "express";

import { authorize } from "../middlewares/authorize.js";
import { FilesController } from "../controller/FilesController.js";

export const FilesRouter = Router();

// Middleware para filtrar por sesiones
FilesRouter.use(authorize);

FilesRouter.get("/pfp", FilesController.Get_PFP);