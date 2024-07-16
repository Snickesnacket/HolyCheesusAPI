
import { Request, Response, NextFunction } from 'express';
import { parseErrors } from '../Errors/ajvErrors';
import { validateProduct } from '../json-schemas/productValidation.schema';

export const addProductValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isValid = validateProduct(req.body);
	console.log(isValid, 'datan')
	if (!isValid && validateProduct.errors) {
		const error = await parseErrors(validateProduct.errors);
		console.log(error, 'errors')
		return res.status(400).json({status: 'errors', code: 400, errors: error})
	}
	next();
};