import { List, ValidateFunction } from 'express-json-validator-middleware';

export const productSchema: List<ValidateFunction>  = {
	body: {
		type:"object",
		required: ['name', 'description', 'image', 'price'],
		properties: {
			name: {
				type: 'string',
				nullable: false,
				minLength: 2,
				maxLength: 20,
			},
			description: {
				type: 'string',
				nullable: false,
				minLength: 4,
				maxLength: 255,
			},
			image: {
				type: 'string',
				nullable: false,
				minLength: 10,
				maxLength: 255,
			},
			price: {
				type: 'number',
				minimum: 1,
				maximum: 10,
			}
		},
	}
};

