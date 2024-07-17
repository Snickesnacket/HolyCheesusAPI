import {Request, Response} from "express";
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../servcies/product_service";

 export interface  PostProduct {
	 name: string,
	 description: string,
	 image: string,
	 price: number,
}

export const index = async (req: Request, res: Response) => {
// TODO: Fetch only the products where deletedAt i NULL
// TODO: Add pagination support for large datasets
// TODO: Implement caching mechanism to improve performance
// TODO: Add logging for better debugging and monitoring
// TODO: Consider adding rate limiting to prevent abuse

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
// TODO: Fetch only the products where deletedAt i NULL
// TODO: Check that the productID exist BEFORE TRYING TO FETCH IT
	const productId = Number(req.params.id)

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
// TODO: Check that the product dosent already exist

	try{
		const queryResult =  await createProduct( req.body )
		if(!queryResult) {
			throw new Error('Something went very shitty bad :(')
		}

		if(!queryResult.affectedRows) {
			res.status(404).send({ status: "error", message: "Something went wrong" })
		}

		const newProductId = queryResult.insertId;
		const product =  await getProduct(newProductId)

		res.send({
			status: "success",
			data: product,
		})

	} catch (err) {
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

export const update = async (req: Request, res: Response ) => {
	 // TODO: ALWAYS update the updatedAt date
	// TODO: update only the fields allowed NOT id, deletedAt, createdAT,
	// TODO: Check that the productID exist

	try{
		const queryResult =  await updateProduct(Number(req.params.id), req.body)
		if(!queryResult) {
			throw new Error('Something went very shitty bad :(')
		}

		res.send({
			status: "success",
			data: queryResult,
		})

	} catch (err) {

		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

export const destroy = async (req: Request, res: Response ) => {
	// TODO: Check that the productID exist
	try{
		const product =  await deleteProduct(Number(req.params.id) )

		if(!product.affectedRows) {
			throw new Error(`Product dosen't exist`)
		}

		res.send({
			status: "success",
			data: product,
		})

	} catch (err) {

		res.status(500).send({ status: "error", message: err })
	}
}