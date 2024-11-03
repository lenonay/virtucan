import { configDotenv } from "dotenv";
configDotenv();

export const {
    PORT,
    MAIL,
    MAIL_PASS,
    PERS_MAIL,
    UPLOAD_ROUTE,
    DEFAULT_USER
} = process.env;

export const allowed_exts = [
    "jpg", "png",
    "jpeg", "gif",
    "pdf"
]