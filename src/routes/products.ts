import express, {request, response} from 'express'
import {destroy, index, update, store, show, reCreate} from '../controllers/productController'
import validate from '../middleware/json-validator';
import {
	getProductSchema,
	getProductsSchema,
	patchProductSchema,
	postProductSchema,
	reCreateProductSchema
} from "../json-schemas/productValidation.schema";


const router = express.Router()

router.get('/', validate(getProductsSchema), index)

router.get( '/:id', validate(getProductSchema), show )

router.post('/', validate(postProductSchema), store)

router.patch('/:id', validate(patchProductSchema), update)

router.patch('/:id/re-create', validate(reCreateProductSchema), reCreate)

router.delete('/:id', destroy)

export default router