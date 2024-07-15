import {conn} from "../db";

export interface  PostProduct {
	Name: string,
	Description: string,
	Image: string,
	Price: string,
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
		console.log(result, 'hello')
		return result;

	} catch (err) {
		console.error(err)
	}
}



export async function createProduct(data: PostProduct) {
	try {
		const result = await conn.query(`INSERT INTO Product SET ?`, {
			Name: data.Name,
			Description: data.Description,
			Image: data.Image,
			price: Number(data.Price)
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
