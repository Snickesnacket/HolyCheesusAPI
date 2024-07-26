import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import e, { Request } from 'express';

const fileFilterConfig = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    console.log(file.mimetype)

    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "audio/mpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

import {randomUUID} from "node:crypto";
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const extension = path.extname(file.originalname);
        const filename = `${randomUUID()}${extension}`;
        callback(null, filename);
    }
})

const upload = multer({ storage: storage, limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilterConfig,})

export default upload