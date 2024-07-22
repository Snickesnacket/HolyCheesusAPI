import {conn} from "../db";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {it} from "node:test";

export interface  PostProduct {
	Id: number,
	name: string,
	description: string,
	image: string,
	price: number,
	createdAt: Date,
	updatedAt: Date,
	deletedAt?: null | Date
	properties: Properties[]
}
export interface Properties {
		propertyId: number
		propertyValueId: number | string
}

interface PropertyRow {
	propertyId: number;
	propertyValueId: number;
	propertyValueName: string;
}
export interface Product {
	Id: number,
	Name: string,
	Description: string,
	Image: string,
	Price: number,
	CreatedAt: Date,
	UpdatedAt: Date,
	DeletedAt?: null | Date
	properties: PropertyRow[];
}
const currentTimestamp: Date = new Date();
export async function getProducts() {
	try {

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

		console.log(propertyRows)

		const products = propertyRows.map(item => {
			let properties = item.Properties_Values.split(',');

			properties = properties.map((property: any) => {
				const [propertyId, propertyName, propertyValueId, propertyValueName] = property.split(':');

				return {
					propertyId, propertyName, propertyValueId, propertyValueName
				}
			})

			item.properties = properties;

			return item;
		})

		return products;

	} catch (err) {
		console.error('Error in getProducts:', err);
		throw err;
	}
}
		export async function getProduct(queryId: number) {
	try{

		const [propertyRows] = await conn.execute<RowDataPacket[]>(
			`SELECT
                 p.Id,
                 p.Name,
                 p.Description,
                 p.Image,
                 p.Price,
                 p.CreatedAt,
                 p.UpdatedAt,
                 p.DeletedAt,
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


			if (propertyRows.length === 0) {
				return null;
			}

			return propertyRows.map(item => {
				let properties = item.Properties_Values.split(',')

				properties = properties.map((property: any) => {
					const [propertyId, propertyName, propertyValueId, propertyValueName] = property.split(':');

					return {
						propertyId, propertyName, propertyValueId, propertyValueName
					}
				})

				item.properties = properties;

				return item;
			})

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


		if(!rows.insertId && typeof 'number') {
			throw new Error
		}
		const pId = rows.insertId

		const values = queryData.properties.flatMap(item => [pId, item.propertyId, item.propertyValueId]);
		const placeholders = queryData.properties.map(() => '(?, ?, ?)').join(', ');
		const sql = `INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES ${placeholders}`;
		const [jointableRows] = await conn.execute(sql, values);

		console.log('Inserted rows:', jointableRows);

		return rows

	} catch (error) {

		console.error('Error in createProduct:', error);
		throw error;
	}
}

export async function updateProduct( id: number, queryData: PostProduct ) {
	try{
		// återskapa en raderad produkt
		if (queryData.deletedAt === null) {
			const [reCreatedrow] = await conn.execute(
				'UPDATE Product SET deletedAt = NULL, updatedAt = ? WHERE Id = ? AND deletedAt IS NOT NULL',
				[currentTimestamp, id]
			);
			// om produkten redan finns eller annat gick fel
			if (!Array.isArray(reCreatedrow) && reCreatedrow.affectedRows === 0) {
				throw new Error('Product not found or already active');
			}
			// produkten lades till och hämtar den återskapade produkten
			if(!Array.isArray(reCreatedrow) && reCreatedrow.affectedRows !=0 ) {
				return await getProduct(id)
			}

		} else {
			// Ändra i en existerande produkt
			const [updatedProduct] = await conn.query(`UPDATE Product SET ?, updatedAt = ? WHERE Id = ? AND deletedAt IS NULL`, [queryData, currentTimestamp, id]);
			// om den inte kunde ändra
			if (!Array.isArray(updatedProduct) && updatedProduct.affectedRows === 0) {
				throw new Error('Product not found or already active');
			}
			// Om den uppdaterades korrekt
			// LÄGG TILL EGENSKAPER

		/*	// transformerar en array med object till en array med (i detta fall ) nummer
			const values = updatedRow.properties.flatMap((item: Product)  => [updatedRow.Id, item.propertyId, item.propertyValueId]);
			// skapar values syntaxen; så för varje object skapas (?, ?, ?)')
			const placeholders = queryData.properties.map(() => '(?, ?, ?)').join(', ');
			// sql- querien
			const sql = `INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES ${placeholders}`;
			// kör kommandot med querien och datan
			await conn.execute(sql, values);*/

			const product =  await getProduct(id)
			console.log(product)

		}

	} catch (err) {
		console.error('Error updating product:', err);
		throw err;
	}

}

export async function deleteProduct( queryId: number ) {
	const [result] = await conn.execute<ResultSetHeader>(
		'UPDATE Product SET deletedAt = ? WHERE Id = ? AND deletedAt IS NULL',
		[currentTimestamp, queryId]
	);
	/*	const [result] = await  conn.execute<ResultSetHeader>(
			'DELETE Product WHERE Id = ?',
			[ queryId] );*/

	return result
}

/*

	SELECT Property.Name, Property_Value.Name FROM Product
	LEFT JOIN Product_Property_Value ON Product.Id = Product_Property_Value.ProductId
	LEFT JOIN Property ON Product_Property_Value.PropertyId = Property.Id
	LEFT JOIN Property_Value ON Product_Property_Value.ProductValueId = Property_Value.Id
	WHERE Product.Id = 1;


	SELECT * FROM Product WHERE Id = 1;
}*/
