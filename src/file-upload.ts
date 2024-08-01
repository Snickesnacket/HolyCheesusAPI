import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import e, { Request } from 'express';

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
) => {
    if (!file || file.mimetype.split('/')[0] != 'image') {
        return callback(new Error('Only images allowed'));
    }
    callback(null, true);
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
        fileSize: 1024 * 1024 * 1000
    },
    fileFilter: fileFilter,})


export default upload