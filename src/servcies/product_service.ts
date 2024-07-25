import {conn} from "../db";
import {QueryResult, ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {PostProduct, Properties} from "../types/product";


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
	const sql = `INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES ${placeholders}`;
	return  await conn.execute(sql, values);
}
export async function updateExistingProduct (queryData: PostProduct, id: number ) {
	const [updatedProduct] = await conn.query(`
	UPDATE Product
	   SET ?,
		   updatedAt = ?
	   WHERE Id = ?
		 AND deletedAt IS NULL`, [queryData, currentTimestamp, id]);
	return updatedProduct
}

export async function recreateProduct (id: number) {
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
		const values = [item.propertyValueId, productId, item.propertyId];

		return await conn.execute(sql, values);
	})
}