import {Request, Response} from "express";
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	insertProductProperties, recreateProduct, updateExistingProduct,
} from "../servcies/product_service";
import {instanceOfNodeError} from "../errorTypeguard";
import {conn} from "../db";

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
		const reponse =  await getProducts()

		if (!reponse) {
			return res.status(404).send({ status: "error", message: "Products not found" });
		}

		const products = reponse.map(item => {
			let properties = item.Properties_Values.split(',');

			properties = properties.map((property: any) => {
				const [propertyId, propertyName, propertyValueId, propertyValueName] = property.split(':');

				return {
					propertyId, propertyName, propertyValueId, propertyValueName
				}
			})

			item.properties = properties;

			return item;
		})

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
		const response = await getProduct(productId);

		if (!response) {
			return res.status(404).send({ status: "error", message: "Product not found" });
		}

		if (response.length === 0) {
			return null;
		}

		const product = response.map(item => {
			let properties = item.Properties_Values.split(',')

			properties = properties.map((property: any) => {
				const [propertyId, propertyName, propertyValueId, propertyValueName] = property.split(':');

				return {
					propertyId, propertyName, propertyValueId, propertyValueName
				}
			})

			item.properties = properties;

			return item;
		})

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
		console.log(req.body)
		const response = await createProduct(req.body);
		console.log(response, 'ny product')

		if (!response) {
			return res.status(404).send({ status: "error", message: "Product already exists" });
		}

		if (!response.insertId && typeof 'number') {
			throw new Error('Failed to create product');
		}
		const productId = response.insertId;

		await insertProductProperties(productId, req.body.properties);

		const product = await getProduct(response.insertId);

		res.status(201).send({
			status: "success",
			data: product,
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
		if (req.body.deletedAt === null) {
			const updatedProduct = await updateExistingProduct(req.body, productId)
				if(!updatedProduct) {
					return res.status(404).send({ status: "error", message: "Product not found" });
				}
				// om produkten redan finns eller annat gick fel
				if (!Array.isArray(updatedProduct) && updatedProduct.affectedRows === 0) {
					throw new Error('Product not found or already active');
				}
				// produkten lades till och hämtar den återskapade produkten
				if(!Array.isArray(updatedProduct) && updatedProduct.affectedRows !=0 ) {
					const p =  await getProduct(updatedProduct.insertId)
					res.send({
						status: "success",
						data: p,
					})
				}

		}
		if (req.body.deletedAt != null) {
			console.log('hej')
			const product  = await recreateProduct(productId)

			if (!Array.isArray(product) && product.affectedRows === 0) {
				throw new Error('Product not found or already active');
			}
			if(!product) {
				return res.status(404).send({ status: "error", message: "Product not found" });
			}
				const p = await getProduct(productId)

				res.send({
					status: "success",
					data: p,
				})
		}


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