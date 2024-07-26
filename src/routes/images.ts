import express from 'express'
import {Request, Response} from "express";
import multer from "multer";
import crypto from "crypto";
import e from "express";
import path from "path";
import {randomUUID} from "node:crypto";
import upload from "../file-upload";

/*const storage = multer.diskStorage({
	destination: 'uploads/',
	filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
		const extension = path.extname(file.originalname);
		const filename = `${randomUUID()}${extension}`;
		callback(null, filename);
	}
})

const upload = multer({ storage: storage })*/

const router = express.Router()

// get picture(s)
router.get('/', ( req: Request, res: Response ) => {
	res.send("Hello from Express!");
})

//create a picture
router.post('/', upload.single('file'), (req, res) =>
{
	// check whether req.file contians the file
	// if not multer is failed to parse so notify the client
	if (!req.file) {
		res.status(413).send(`File not uploaded!, Please 
                              attach jpeg file under 5 MB`);
		return;
	}

	console.log(req.file.originalname)
	// successfull completion
	res.status(201).send(` Files uploaded successfully`);
})

//recreate picture
router.patch('/:id/re-create',)

//delete picture
router.delete('/:id', )

export default router