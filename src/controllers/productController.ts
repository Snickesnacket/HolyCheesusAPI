import {Request, Response} from "express";
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../servcies/product_service";
import {instanceOfNodeError} from "../errorTypeguard";

 export interface  PostProduct {
	 name: string,
	 description: string,
	 image: string,
	 price: number,
	 deletedAt?: null | Date
	 properties: [
		 {
			 propertyId: number
			 propertyValueId: number
		 }
	 ]
}

export const index = async (req: Request, res: Response) => {
	try{
		const products =  await getProducts()

		if (!products) {
			return res.status(404).send({ status: "error", message: "Products not found" });
		}

		res.send({
			status: "success",
			data: products,
		})

	} catch (err) {
		console.error('Error fetching product:', err);
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}


export const show = async (req: Request, res: Response) => {
	const productId = Number(req.params.id);

	if (isNaN(productId) || productId <= 0) {
		return res.status(400).send({ status: "error", message: "Invalid product ID" });
	}

	try {
		const product = await getProduct(productId);

		if (!product) {
			return res.status(404).send({ status: "error", message: "Product not found" });
		}

		res.send({
			status: "success",
			data: product,
		});

	} catch (err) {
		console.error('Error fetching product:', err);
		res.status(500).send({ status: "error", message: "Something went wrong" });
	}
};



export const store = async (req: Request, res: Response) => {
	try {

		const newProduct = await createProduct(req.body);
		console.log(newProduct, 'ny product')

		if (!newProduct) {
			return res.status(404).send({ status: "error", message: "Product already exists" });
		}

		// Fetch the newly created product
		const result = await getProduct(newProduct.insertId);
		res.status(201).send({
			status: "success",
			data: result,
		});

	} catch (err) {
		console.error('Error creating product:', err);
		if (err instanceof Error) {
			return res.status(409).json({
				status: "error",
				message: "A product with this name already exists",
				sqlMessage: err.message
			});
		}
	}
};



export const update = async (req: Request, res: Response ) => {
	const productId = Number(req.params.id);

	if (isNaN(productId) || productId <= 0) {
		return res.status(400).send({ status: "error", message: "Invalid product ID" });
	}

	try{
		const queryResult =  await updateProduct(productId, req.body)

		if(!queryResult) {
			return res.status(404).send({ status: "error", message: "Product not found" });
		}

		res.send({
			status: "success",
			data: queryResult,
		})

	} catch (err: any) {
		if (instanceOfNodeError(err, Error)) {
			switch (err.code) {
				case 'ER_DUP_ENTRY':
					return res.status(409).json({
						status: "error",
						message: "A product with this name already exists",
						sqlMessage: err.message
					});
				case 'ER_NO_REFERENCED_ROW_2':
					return res.status(400).json({
						status: "error",
						message: "Invalid reference in the product data",
						sqlMessage: err.message
					});
				default:
					return res.status(500).json({
						status: "error",
						message: "Database error occurred",
						sqlMessage: err.message
					});
			}
		}

		res.status(500).json({status: "error", message: "Something went wrong"});
	}
}

export const destroy = async (req: Request, res: Response ) => {
	const productId = Number(req.params.id);

	if (isNaN(productId) || productId <= 0) {
		return res.status(400).send({ status: "error", message: "Invalid product ID" });
	}

	try{
		const product =  await deleteProduct(productId )

		if(!product.affectedRows) {
			throw new Error(`Product dosen't exist`)
		}

		res.send({
			status: "success",
			data: product,
		})

	} catch (err: any) {
		console.log(err)
		if(err.code === 1216) {
			return res.status(400).send({ status: "error", message: "This property dose not exist" });
		}
		if (instanceOfNodeError(err, Error)) {
		switch (err.code) {
			case 'ER_ROW_IS_REFERENCED_2':
				return res.status(409).json({
					status: "error",
					message: "Cannot delete product as it is referenced by other records",
					sqlMessage: err.message
				});
			default:
				return res.status(500).json({
					status: "error",
					message: "Database error occurred",
					sqlMessage: err.message
				});
		}
	}

	res.status(500).json({
		status: "error",
		message: "An unexpected error occurred while deleting the product"
	});
}
};