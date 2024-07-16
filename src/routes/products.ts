import express from 'express'
import {destroy, index,update, store, show} from '../controllers/productController'
import {addProductValidator} from "../Validations/productValidator";


const router = express.Router()

router.get('/', index)

router.get( '/:productId', show )
router.post('/', addProductValidator, store)

router.patch('/:productId', update)

router.delete('/:productId', destroy)

export default router