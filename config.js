import { configDotenv } from "dotenv";
configDotenv();

export const {
    PORT,
    MAIL,
    MAIL_PASS,
    PERS_MAIL,
    UPLOAD_ROUTE,
    DEFAULT_USER,
    JWT_PASS
} = process.env;

export const allowed_exts = [
    "jpg", "png",
    "jpeg", "gif",
    "pdf"
]