import { Router } from "express";

import { authorize } from "../middlewares/authorize.js";
import { UserController } from "../controller/UserController.js";

export const UserRouter = Router();

// Protegemos la ruta
UserRouter.use(authorize); 

// Recuperar los datos del usuario de la sesion
UserRouter.get("/", UserController.GetUserInfo);

UserRouter.put("/", UserController.UpdateOwnUser);

// // Recuperar los datos de todos los usuarios
// UserRouter.get("/all", UserController.GetAllUsersInfo);

// // Crear un usuario nuevo
// UserRouter.post("/", UserController.CreateUser);

// // Actualizar los datos de un usuario
// UserRouter.patch("/:id", UserController.UpdateUser);

// // Borrar un usuario
// UserRouter.delete("/:id", UserController.DeleteUser);