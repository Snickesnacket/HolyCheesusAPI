import express from 'express'
import { index, store, show} from '../controllers/productController'
import {destroy, update} from "../controllers/controller";

const router = express.Router()

router.get('/', index)

router.get( '/:productId', show )

router.post('/', store)

router.patch('/:productId', update)

router.delete('/:productId', destroy)

export default router