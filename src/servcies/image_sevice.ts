import {conn} from "../db";
import {ResultSetHeader} from "mysql2/promise";

export async function addImage (img: string) {
	const [rows] = await conn.query<ResultSetHeader>(`
        INSERT INTO Image (file) VALUES (?);`, [img])
	return rows
}

//SELECT THE NEWLY CREATED IMG ID TO USE BELOW!!!
export async function addImageToJoin (idImage: number, id: number) {
	const [rows] = await conn.query<ResultSetHeader>(`
        INSERT INTO Product_Image (ProductId, ImageId) VALUES (?,?);`, [id, idImage])
	console.log(rows)
	return rows
}

//SAVE FOR LATER
//gets a product with its images :)
export async function getProductImages (img: number, id: number) {
	const rows = conn.execute(`
        SELECT Product.*, GROUP_CONCAT(Image.file SEPARATOR ',') AS images
        FROM Product
                 LEFT JOIN Product_Image ON Product.Id = Product_Image.ProductId
                 LEFT JOIN Image ON Product_Image.ImageId = Image.Id
        WHERE Product.Id = ?
        GROUP BY Product.Id`, [id])
	return rows
}
