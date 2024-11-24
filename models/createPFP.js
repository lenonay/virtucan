import fs from "node:fs";
import { UPLOAD_ROUTE } from "../config.js";

export function CreatePFP(id) {
    const rand = Math.floor(Math.random() * 6) + 1;

    try {
        fs.copyFileSync(`./public/pfp-${rand}.png`, `${UPLOAD_ROUTE}pfp-${id}.png`);
    } catch { }

    return `${UPLOAD_ROUTE}pfp-${id}.png`;
}