import express from 'express'
import {destroy, index,update, store, show} from '../controllers/productController'
import validate from '../middleware/json-validator';
import {productSchema} from "../json-schemas/productValidation.schema";

const router = express.Router()

router.get('/', index)

router.get( '/:productId', show )

router.post('/', validate(productSchema), store)

router.patch('/:productId', update)

router.delete('/:productId', destroy)

export default router