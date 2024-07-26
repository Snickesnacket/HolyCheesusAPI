import {Request, Response} from "express";
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	insertProductProperties, recreateProduct, updateExistingProduct, updateProductProperties,
} from "../servcies/product_service";


import {instanceOfNodeError} from "../errorTypeguard";
import {conn} from "../db";
import {commitTransaction, rollbackTransaction, startTransaction} from "../servcies/helper_service";

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


	try {
		const response = await getProduct(productId);

		if (!response || response.length === 0) {
			throw new Error("Failed to find selected product")
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

		if(!product){
			throw new Error( "Failed to fetch product")
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
		let transactionAcitve = false;
	try {

		await startTransaction();
		transactionAcitve = true;

		const productResponse = await createProduct(req.body);

		if (!productResponse) {
			return res.status(404).send({ status: "error", message: "Product already exists" });
		}

		const propertyResponse = await insertProductProperties(productResponse.insertId, req.body.properties);

		if(!propertyResponse) {
			throw new Error('Failed to set properties of the product');
		}

		const product = await getProduct(productResponse.insertId);

		if (productResponse && propertyResponse && product ) {
			await commitTransaction();
			transactionAcitve = false;
			res.status(201).send({
				status: "success",
				data: product,
			});
		} else {
			await rollbackTransaction();
			transactionAcitve = false;
			return res.status(500).json({error: 'Failed to create product'})
		}

	} catch (err) {
		if (transactionAcitve) {
			await rollbackTransaction();
		}
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
	let transactionAcitve = false;
	try{
		await startTransaction();
		transactionAcitve = true;
		const getProductResponse = await getProduct(productId)

		if(!getProductResponse) {
			await rollbackTransaction();
			transactionAcitve = false;
			return res.status(404).send({ status: "error", message: "Product not found" });
		}
		if (getProductResponse.at(0)?.deletedAt === null) {
			const { properties } = req.body
			delete req.body.properties;

			const updatedProduct = await updateExistingProduct(req.body, productId)

			if(!updatedProduct || !Array.isArray(updatedProduct) && updatedProduct.affectedRows === 0) {
				await rollbackTransaction();
				transactionAcitve = false;
				return res.status(404).send({ status: "error", message: "Product not found" });
			}

			const propertyResponse = await updateProductProperties(productId, properties)
			const result = await Promise.all(propertyResponse);

			if(!Array.isArray(updatedProduct) && updatedProduct.affectedRows !=0 && propertyResponse) {
				const product =  await getProduct(updatedProduct.insertId)
				if(product) {
					await commitTransaction();
					transactionAcitve = false;
					res.send({
						status: "success",
						data: product,
					})
				}

			} else {
				await rollbackTransaction();
				transactionAcitve = false;
				return res.status(500).json({error: 'Failed to create product'})
			}

		}

	} catch (err: any) {
		if (transactionAcitve) {
			await rollbackTransaction();
		}
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
	}
};

export const reCreate = async (req: Request, res: Response ) => {
	const productId = Number(req.params.id);
	let transactionAcitve = false;

	try{
		await startTransaction();
		transactionAcitve = true;

		const product  = await recreateProduct(productId)

		if (!Array.isArray(product) && product.affectedRows === 0 || !product) {
			throw new Error('Product not found or already active');

		}
		const p = await getProduct(productId)

		if(p){
			await commitTransaction();
			transactionAcitve = false;
			res.send({
				status: "success",
				data: p,
			})
		}else {
			await rollbackTransaction();
			transactionAcitve = false;
			return res.status(500).json({error: 'Failed to create product'})
		}

	} catch (err: any) {
		if (transactionAcitve) {
			await rollbackTransaction();
		}
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
	}
}