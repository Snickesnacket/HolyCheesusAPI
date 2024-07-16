import {conn} from "../db";

export interface  PostProduct {
	name: string,
	description: string,
	image: string,
	price: number,
}


export async function getProducts() {

	try {
		 const [result] = await conn.query("SELECT * FROM Product");
		 return result;

	} catch (err) {
		console.error(err)
	}
}

export async function getProduct( id: number ) {
	try {
		const [result] = await conn.query("SELECT * FROM Product WHERE Id = ?", [id]);
		return result;

	} catch (err) {
		console.error(err)
	}
}



export async function createProduct(data: PostProduct) {
	try {
		const [result] = await conn.query(`INSERT INTO Product SET ?`, {
			Name: data.name,
			Description: data.description,
			Image: data.image,
			price: data.price
		});

		return result;

	} catch (err) {
		console.error(err)
	}
}

export async function updateProduct( id: number, data: PostProduct ) {
	try{
		const [result] = await conn.query(`UPDATE Product SET ? WHERE ID = ?`, [data, id]);
			if(!result) {
				throw new Error()
			}
			return result
	} catch (err) {
		console.error(err)
	}
}

export async function deleteProduct( id: number ) {
	try{
		const [result] = await conn.query(`DELETE FROM Product  WHERE Id = ?`, [id]);
		if(!result) {
			throw new Error()
		}
		return result
	} catch (err) {
		console.error(err)
	}
}
