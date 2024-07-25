import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storageConfig = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileFilterConfig = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storageConfig,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilterConfig,
});

export default upload;