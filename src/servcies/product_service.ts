import {conn} from "../db";
import mysql, {ResultSetHeader, RowDataPacket} from "mysql2/promise";

export interface  PostProduct {
	name?: string,
	description?: string,
	image?: string,
	price?: number,
	deletedAt?: null | Date 
}
const currentTimestamp: Date = new Date();

export async function getProducts() {
	try {
		 const [rows]  = await conn.execute<RowDataPacket[]>(`SELECT * FROM Product WHERE deletedAt IS NULL`);

		 return rows;

	} catch (err) {
		console.error('Error in getProducts:', err);
		throw err;
	}
}

export async function getProduct(queryId: number): Promise<RowDataPacket | null> {
	try {
		const [rows] = await conn.execute<RowDataPacket[]>(
			'SELECT * FROM Product WHERE Id = ? AND deletedAt IS NULL',
			[queryId]
		);

		return rows.length > 0 ? rows[0] : null;

	} catch (err) {
		console.error('Error in getProduct:', err);
		throw err;
	}
}



export async function createProduct(queryData: PostProduct) {
	try {
		const [rows] = await conn.query<ResultSetHeader>(`INSERT INTO Product SET ?`, {
			Name: queryData.name,
			Description: queryData.description,
			Image: queryData.image,
			price: queryData.price
		});

		return rows

	} catch (error) {
		console.error('Error in createProduct:', error);
		throw error;
	}
}

export async function updateProduct( queryId: number, queryData: PostProduct ) {
	try{

		// återskapa en raderad produkt
		if (queryData.deletedAt === null) {
			const [reCreateResult] = await conn.execute(
				'UPDATE Product SET deletedAt = NULL, updatedAt = ? WHERE Id = ? AND deletedAt IS NOT NULL',
				[currentTimestamp, queryId]
			);
			// om produkten redan finns eller annat gick fel
			if (!Array.isArray(reCreateResult) && reCreateResult.affectedRows === 0) {
				throw new Error('Product not found or already active');
			}
			// produkten lades till och hämtar den återskapade produkten
			if(!Array.isArray(reCreateResult) && reCreateResult.affectedRows !=0 ) {
				return await getProduct(queryId)
			}

		} else {
			// Ändra i en existerande produkt
			const [updatedProduct] = await conn.query(`UPDATE Product SET ?, updatedAt = ? WHERE Id = ? AND deletedAt IS NULL`, [queryData, currentTimestamp, queryId]);
			// om den inte kunde ändra
			if (!Array.isArray(updatedProduct) && updatedProduct.affectedRows === 0) {
				throw new Error('Product not found or already active');
			}
			// Om den uppdaterades korrekt
			return updatedProduct
		}

	} catch (err) {
		console.error('Error updating product:', err);
		throw err;
	}

}

export async function deleteProduct( queryId: number ) {
		const [result] = await  conn.execute<ResultSetHeader>(
			'UPDATE Product SET deletedAt = ? WHERE Id = ? AND deletedAt IS NULL',
			[currentTimestamp, queryId]
		);
		return result
}

