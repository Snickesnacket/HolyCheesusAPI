import express from 'express'
import { store } from '../controllers/loginController'

const router = express.Router()

router.post('/', store)

export default router