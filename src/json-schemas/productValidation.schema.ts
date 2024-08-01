import { List, ValidateFunction } from 'express-json-validator-middleware';

export const getProductsSchema: List<ValidateFunction> = {
	params: {
		type: 'object',
		required: ['limit'],
		properties: {
			limit: {
				type: 'number',
				enum: [10, 15, 20],
			},
		},
	},
};
export const getProductSchema: List<ValidateFunction> = {
	params: {
		type: 'object',
		required: ['id'],
		properties: {
			id: {
				type: 'string',
				minLength: 1,
				maxLength: 10,
			},
		},
	},
};
export const postProductSchema: List<ValidateFunction>  = {
	body: {
		type:"object",
		required: ['name', 'description', 'price', 'properties'],
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
			price: {
				type: 'number',
				minimum: 1,
				maximum: 1000,
			},
			properties: {
				type: "array", items: {type: "object"},
			},

		},
	}
};



export const patchProductSchema: List<ValidateFunction> = {
	params: {
		type: 'object',
		required: ['id'],
		properties: {
			id: {
				type: 'string',
				minLength: 1,
				maxLength: 10,
			},
		},
	},
	body: {
		required: ['name', 'description', 'price', 'properties'],
		type: 'object',
		properties: {
			name: {
				type: 'string',
				minLength: 2,
				maxLength: 20,
			},
			description: {
				type: 'string',
				minLength: 4,
				maxLength: 255,
			},
			price: {
				type: 'number',
				minimum: 1,
				maximum: 1000,
			},
			properties: {
				type: "array", items: {type: "object"},
			}
		},
	},
};


export const reCreateProductSchema: List<ValidateFunction> = {
	params: {
		type: 'object',
		required: ['id'],
		properties: {
			id: {
				type: 'string',
				minLength: 1,
				maxLength: 10,
			},
		},
	},
};
