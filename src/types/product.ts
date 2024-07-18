export interface Product {
	id: number,
	name: string,
	description: string,
	image: string,
	price: number,
	createdAt: Date,
	updatedAt: Date,
	deletedAt: null | Date,
}


export interface Property {
	id: number,
	name: number,
}

