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
router.post('/:id', upload.single('file'), store)

//recreate picture
router.patch('/:id/re-create',)

//delete picture
router.delete('/:id', )

export default router