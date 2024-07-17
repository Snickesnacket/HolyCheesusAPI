import {conn} from "../db";
import mysql from "mysql2/promise";

export interface  PostProduct {
	name?: string,
	description?: string,
	image?: string,
	price?: number,
	deletedAt?: null | Date 
}


export async function getProducts() {

	try {
		 const [result] = await conn.query(`SELECT * FROM Product`);
		 return result;

	} catch (err) {
		console.error(err)
	}
}

export async function getProduct( queryId: number ) {
	try {
		const [insertResult] = await conn.query(`SELECT * FROM Product WHERE Id = ?`, [queryId]);
		return insertResult;

	} catch (err) {
		console.error(err)
	}
}



export async function createProduct(queryData: PostProduct) {
	try {
		const [insertResult] = await conn.query(`INSERT INTO Product SET ?`, {
			Name: queryData.name,
			Description: queryData.description,
			Image: queryData.image,
			price: queryData.price
		});

		return insertResult as mysql.ResultSetHeader

	} catch (err) {
		console.error(err)
	}
}

export async function updateProduct( queryId: number, queryData: PostProduct ) {
	try{
		 console.log('hej!', queryData)
		if (queryData.deletedAt === null) {
		
			const [recreateResult] = await conn.execute(
				'UPDATE Product SET deletedAt = NULL, updatedAt = CURRENT_TIMESTAMP WHERE Id = ? AND deletedAt IS NOT NULL',
				[queryId]
			);

			if (!Array.isArray(recreateResult) && recreateResult.affectedRows === 0) {
				  console.log(recreateResult)
				throw new Error('Product not found or already active');
			}

			if(!Array.isArray(recreateResult) && recreateResult.affectedRows !=0) {
				return getProduct(recreateResult.insertId )
			}

		} else {
			const [insertResult] = await conn.query(`UPDATE Product SET ?, updatedAt = CURRENT_TIMESTAMP WHERE Id = ? AND deletedAt IS NULL`, [queryData, queryId]);

			if (!Array.isArray(insertResult) && insertResult.affectedRows === 0) {
				throw new Error('Product not found or already active');
			}
			return insertResult
		}

	} catch (err) {
		console.error('Error updating product:', err);
		throw err;
	}

}

export async function deleteProduct( queryId: number ) {

		const [insertResult] = await  conn.execute(
			'UPDATE Product SET deletedAt = CURRENT_TIMESTAMP WHERE Id = ? AND deletedAt IS NULL',
			[queryId]
		);
		return insertResult as mysql.ResultSetHeader
}

