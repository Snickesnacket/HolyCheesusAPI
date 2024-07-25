

export interface  PostProduct {
	Id: number,
	name: string,
	description: string,
	image: string,
	price: number,
	createdAt: Date,
	updatedAt: Date,
	deletedAt?: null | Date
	properties?: Properties[]
}
export interface Properties {
	propertyId: number,
	propertyName: string,
	propertyValueId: number | string,
	propertyValueName: string
}



export interface PatchProduct {
	Id: number,
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