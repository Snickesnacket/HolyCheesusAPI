import express from 'express'
import {Request, Response} from "express";
import upload from "../file-upload";
import {store} from "../controllers/imageController";


const router = express.Router()

// get picture(s)
router.get('/', ( req: Request, res: Response ) => {
	res.send("Hello from Express!");
})

//create a picture
router.post('/:id', upload.single('file'),/* (req, res) =>
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
}*/store)

//recreate picture
router.patch('/:id/re-create',)

//delete picture
router.delete('/:id', )

export default router