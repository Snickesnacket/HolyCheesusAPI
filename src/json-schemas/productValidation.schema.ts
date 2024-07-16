import { VALIDATION_ERRORS } from '../Errors/errorMessages'
import Ajv, { JSONSchemaType } from 'ajv';
const ajv = new Ajv({
	allErrors: true,
	verbose: true,
	coerceTypes: true  // Add this line to allow type coercion
});

import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
addFormats(ajv);
ajvErrors(ajv /*,{ singleError: true }*/);

export interface  ProductSchema {
	Name: string,
	Description: string,
	Image: string,
	Price: number,
}

const productSchema: JSONSchemaType<ProductSchema> = {
	type: 'object',
	properties: {
		Name: {
			type: 'string',
			nullable: false,
			minLength: 2,
			maxLength: 20,
			errorMessage: {
				minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 character`,
				maxLength: VALIDATION_ERRORS.MAX_LENGTH,
				type: `${VALIDATION_ERRORS.TYPE} String`,
			},
		},
		Description: {
			type: 'string',
			nullable: false,
			minLength: 4,
			maxLength: 255,
			errorMessage: {
				minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
				maxLength: `${VALIDATION_ERRORS.MIN_LENGTH} 255 characters`,
				type: `${VALIDATION_ERRORS.TYPE} String`,
			},
		},
		Image: {
			type: 'string',
			nullable: false,
			minLength: 10,
			maxLength: 255,
			errorMessage: {
				minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 10 numbers`,
				maxLength: `${VALIDATION_ERRORS.MAX_LENGTH} 10 numbers`,
				type: `${VALIDATION_ERRORS.TYPE} String`,
			},
		},
		Price: {
			type: 'number',
			minimum: 0.01,
			maximum: 999999,
			errorMessage: {
				minimum: `${VALIDATION_ERRORS.MINIMUM} 0.01`,
				maximum: `${VALIDATION_ERRORS.MAXIMUM} 999999`,
				type: `${VALIDATION_ERRORS.TYPE} Number`,
			},
		}
	},
	required: ['Name', 'Description', 'Image', 'Price'],
	additionalProperties: false,
};

export const validateProduct = ajv.compile(productSchema);