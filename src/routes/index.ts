import express from "express"
import loginRouter  from './login'
import productRouter from './products'
import imageRouter from './images'
const router = express.Router()

router.use('/login', function(req, res, next){
	console.log("A new request received at " + Date.now());
	next(); }, loginRouter )

router.use('/products',productRouter)

router.use('/images',imageRouter)


export default router

