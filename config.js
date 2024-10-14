import { configDotenv } from "dotenv";
configDotenv();

export const {
    PORT,
    MAIL,
    MAIL_PASS,
    PERS_MAIL
} = process.env