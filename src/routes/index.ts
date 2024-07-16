import express from "express"
import loginRouter  from './login'
import productRouter from './products'
const router = express.Router()

router.use('/login', function(req, res, next){
	console.log("A new request received at " + Date.now());
	next(); }, /*validate, controller*/ loginRouter )

router.use('/products', /*validate, controller*/ productRouter)

export default router