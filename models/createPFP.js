import fs from "node:fs";
import { UPLOAD_ROUTE } from "../config.js";

export function CreatePFP(user){
    const rand = Math.floor(Math.random() * 6) + 1;

    fs.copyFileSync(`./public/pfp-${rand}.png`, `${UPLOAD_ROUTE}pfp-${user}.png`);
}