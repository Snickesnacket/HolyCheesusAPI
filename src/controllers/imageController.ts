import {Request, Response} from "express";
import {commitTransaction, rollbackTransaction, startTransaction} from "../servcies/helper_service";
import {addImage, addImageToJoin} from "../servcies/image_sevice";



// get all
export const index = async (req: Request, res: Response) => {
}

// get one
export const show = async (req: Request, res: Response) => {
}

// post
export const store = async (req: Request, res: Response) => {
	let transactionAcitve = false;
	try {

		await startTransaction();
		const img = JSON.stringify(req.file?.filename)
		const productId = Number(req.params.id);

		const ImageResponse = await addImage(img);
		const joinResponse = await addImageToJoin(img, productId)
		console.log(ImageResponse, joinResponse)


		if (!ImageResponse) {
			return res.status(404).send({ status: "error", message: "Product already exists" });
		}

		/*const propertyResponse = await insertProductProperties(ImageResponse.insertId, req.body.properties);

		if(!propertyResponse) {
			throw new Error('Failed to set properties of the product');
		}

		const product = await getProduct(ImageResponse.insertId);

		if (ImageResponse && propertyResponse && product ) {
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
*/
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


// patch one
export const update = async (req: Request, res: Response) => {
}

// delete one
export const destroy = async (req: Request, res: Response) => {
}
