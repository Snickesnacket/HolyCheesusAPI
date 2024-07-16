import {Request, Response} from "express";
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../servcies/product_service";

 export interface  PostProduct {
	 name: string,
	 description: string,
	 image: string,
	 price: number,
}

export const index = async (req: Request, res: Response) => {
	try{
		const products =  await getProducts()

		res.send({
			status: "success",
			data: products,
		})

	} catch (err) {
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

export const show = async (req: Request, res: Response )=> {
	const productId = Number(req.params.productId)

	try{
		const product =  await getProduct(productId)

		res.send({
			status: "success",
			data: product,
		})

	} catch (err) {

		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}


export const store = async (req: Request, res: Response )=> {
	const newProduct = req.body
	console.log(newProduct)
	try{
		const product =  await createProduct(newProduct)

		res.send({
			status: "success",
			data: product,
		})

	} catch (err) {
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

export const update = async (req: Request, res: Response ) => {
	const productId = Number(req.params.productId)
	const newProduct = req.body

	try{
		const product =  await updateProduct(productId, newProduct)

		res.send({
			status: "success",
			data: product,
		})

	} catch (err) {

		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

export const destroy = async (req: Request, res: Response ) => {
	const productId = Number(req.params.productId)

	try{
		const product =  await deleteProduct(productId )

		res.send({
			status: "success",
			data: product,
		})

	} catch (err) {

		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}