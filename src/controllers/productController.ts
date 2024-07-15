import {Request, Response} from "express";
import {createProduct, getProduct, getProducts} from "../servcies/product_service";

 export interface  PostProduct {
	 Name: string,
	 Description: string,
	 Image: string,
	 Price: number,
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