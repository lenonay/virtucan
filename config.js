import { configDotenv } from "dotenv";
configDotenv();

export const {
    PORT,
    MAIL,
    MAIL_PASS,
    PERS_MAIL,
    UPLOAD_ROUTE
} = process.env;

export const allowed_exts = [
    "jpg", "png",
    "jpeg", "gif"
]