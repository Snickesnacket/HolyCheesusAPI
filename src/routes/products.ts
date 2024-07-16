import express from 'express'
import {destroy, index,update, store, show} from '../controllers/productController'
import validate from '../middleware/json-validator';
import {getProductSchema, postProductSchema} from "../json-schemas/productValidation.schema";

const router = express.Router()

router.get('/', index)

router.get( '/:id', validate(getProductSchema), show )

router.post('/', validate(postProductSchema), store)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router