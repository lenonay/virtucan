import jwt from 'jsonwebtoken';

import { JWT_PASS } from '../config.js';

export function csrf(req, res, next) {
    // Creamos el payload del jwt
    const token_data = {
        user_agent: req.get("User-Agent"),
        rand: Math.random().toString(16).replace(/0\./, "CsrfValue_")
    }

    // Firmamos el jwt
    const csrf_token = jwt.sign(token_data, JWT_PASS, { expiresIn: "2m" });

    // Lo metemos a la cookie y seguimos
    res.cookie("csrf_token", csrf_token,
        {
            sameSite: "strict",
            maxAge: 1000 * 120
        }
    );

    next();
}