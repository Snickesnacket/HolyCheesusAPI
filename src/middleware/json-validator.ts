
import { Validator, ValidationError } from 'express-json-validator-middleware';
import { Request, Response, NextFunction } from 'express';
import addFormats from 'ajv-formats';

const validator = new Validator({ allErrors: true, removeAdditional: 'all',
		coerceTypes: true,
		useDefaults: true
});
addFormats(validator.ajv);

export default validator.validate;

export function validationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof ValidationError) {
		res.status(400).json(err.validationErrors);
		return next();
	}

	return next(err);
}
