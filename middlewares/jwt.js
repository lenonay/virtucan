import jwt from "jsonwebtoken";

import { JWT_PASS } from "../config.js";

export function token(req, res, next){
    // Sacamos el jwt de la cookie
    const token = req.cookies.token

    if(token){
        const data = jwt.verify(token, JWT_PASS);

        req.session = data;
    }

    next();
}