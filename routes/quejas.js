import { Router } from "express";
import { QuejaController } from "../controller/QuejaControler.js";

export const QuejaRouter = Router();

QuejaRouter.post("/register", QuejaController.register);