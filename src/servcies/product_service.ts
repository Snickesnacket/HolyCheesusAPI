import {conn} from "../db";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
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

const currentTimestamp: Date = new Date();
export async function getProducts() {
	const [propertyRows] = await conn.execute<RowDataPacket[]>(
		`SELECT
             p.*,
             GROUP_CONCAT(CONCAT(pr.Id, ':', pr.Name, ':', pv.Id, ':', pv.Name) SEPARATOR ',') AS Properties_Values
         FROM
             Product p
                 JOIN
             Product_Property_Value ppv ON p.Id = ppv.ProductId
                 JOIN
             Property pr ON ppv.PropertyId = pr.Id
                 JOIN
             Property_Value pv ON ppv.ProductValueId = pv.Id
         WHERE p.DeletedAt IS NULL
         GROUP BY
             p.Id
         ORDER BY
             p.Id DESC
             LIMIT 10;`,
	);
	return propertyRows
}
export async function getProduct(queryId: number) {
		const [propertyRows] = await conn.execute<RowDataPacket[]>(
			`SELECT
                 p.*,
                 GROUP_CONCAT(CONCAT(pr.Id, ':', pr.Name, ':', pv.Id, ':', pv.Name) SEPARATOR ',') AS Properties_Values
             FROM
                 Product p
                     JOIN Product_Property_Value ppv ON p.Id = ppv.ProductId
                     JOIN Property pr ON ppv.PropertyId = pr.Id
                     JOIN Property_Value pv ON ppv.ProductValueId = pv.Id
             WHERE p.DeletedAt IS NULL AND p.Id = ?
             GROUP BY p.Id, p.Name, p.Description, p.Image, p.Price, p.CreatedAt, p.UpdatedAt, p.DeletedAt;`,
			[queryId]
		);
		return propertyRows
}

export async function createProduct(queryData: PostProduct) {
	console.log(queryData)
	const [rows] = await conn.query<ResultSetHeader>(
		`INSERT INTO Product SET ?`,
		{
			Name: queryData.name,
			Description: queryData.description,
			Image: queryData.image,
			price: queryData.price
		}
	);
	return rows;
}

export async function deleteProduct( queryId: number ) {
	const [result] = await conn.execute<ResultSetHeader>(
		'UPDATE Product SET deletedAt = ? WHERE Id = ? AND deletedAt IS NULL',
		[currentTimestamp, queryId]
	);
	return result
}


export async function insertProductProperties(productId: number, properties: any[]) {
	const values = properties.flatMap(item => [productId, item.propertyId, item.propertyValueId]);
	const placeholders = properties.map(() => '(?, ?, ?)').join(', ');
	const sql = `UPDATE Product_Property_Value SET (ProductId, PropertyId, ProductValueId) WHERE ProductId = ? ${placeholders}, ,[PId]`;
	return await conn.execute(sql, values);
}
export async function updateExistingProduct (queryData: PostProduct, id: number ) {
	const { properties } = queryData
	 delete queryData.properties;

	const [updatedProduct] = await conn.query(`
	UPDATE Product
	   SET ?,
		   updatedAt = ?
	   WHERE Id = ?
		 AND deletedAt IS NULL`, [queryData, currentTimestamp, id]);
		console.log(updatedProduct, 'here')
	return {updatedProduct, properties}
}

export async function recreateProduct (id: number) {
	console.log(id)
	const [recreation] = await conn.execute(
		'UPDATE Product SET deletedAt = NULL, updatedAt = ? WHERE Id = ? AND deletedAt IS NOT NULL',
		[currentTimestamp, id]
	);
	return recreation
}

export async function updateProductProperties (productId: number, properties: Properties[]) {
	return properties.map(async item => {
		const sql = `
                UPDATE Product_Property_Value
                SET ProductValueId = ?
                WHERE ProductId = ?
                  AND PropertyId = ?;
			`;
		const values = [item.propertyValueId, productId, item.propertyId]
		console.log(sql, values, 'hereee')
		await conn.execute(sql, values);
	})
}