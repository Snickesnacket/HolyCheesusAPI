import express from 'express'
import upload from "../file-upload";
import {store} from "../controllers/imageController";

const router = express.Router()


//create a picture
router.post('/:id', upload.single('file'), store)

//recreate picture
router.patch('/:id/re-create',)

//delete picture
router.delete('/:id', )

export default router