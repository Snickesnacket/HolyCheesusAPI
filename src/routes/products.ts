import express from 'express'
import {destroy, index,update, store, show} from '../controllers/productController'
import validate from '../middleware/json-validator';
const router = express.Router()

router.get('/',  validate(), index)

router.get( '/:productId', validate(), show )

router.post('/',  validate(), store)

router.patch('/:productId',  validate(), update)

router.delete('/:productId',  validate(), destroy)

export default router