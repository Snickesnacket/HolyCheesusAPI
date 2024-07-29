import {Request, Response} from "express";
import {commitTransaction, rollbackTransaction, startTransaction} from "../servcies/helper_service";
import {addImage, addImageToJoin} from "../servcies/image_sevice";
import * as fs from "fs";
import path from "path";



// get all
export const index = async (req: Request, res: Response) => {
}

// get one
export const show = async (req: Request, res: Response) => {
}

// post
export const store = async (req: Request, res: Response) => {
	let transactionAcitve = true;
	try {

		await startTransaction();
		const img = req.file?.filename ?? '';
		const productId = Number(req.params.id);

		const ImageResponse = await addImage(img);


		if (!ImageResponse) {
			return res.status(404).json({ status: "error", message: "Product already exists" });
		}

		const imageId = ImageResponse.insertId

		const joinResponse = await addImageToJoin(imageId, productId)

		if (!joinResponse) {
			return res.status(404).json({ status: "error", message: "Could not add image" });
		}

		await commitTransaction();
		transactionAcitve = false

		return res.status(200).json({status: "success", message: "Created image"});

	} catch (err) {
		if (transactionAcitve) {
			const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
			fs.unlinkSync(`${uploadsPath}/${req.file?.filename}` ?? '')
			console.log(`/uploads/${req.file?.filename}` )
			await rollbackTransaction();
		}
		console.error('Error creating image:', err);
		if (err instanceof Error) {
			return res.status(409).json({
				status: "error",
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
