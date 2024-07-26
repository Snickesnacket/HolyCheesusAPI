import {conn} from "../db";

export async function addImage (img: string) {
	const rows = conn.execute(`
        INSERT INTO Image (file) VALUES (?);`, [img])
	return rows
}

//SELECT THE NEWLY CREATED IMG ID TO USE BELOW!!!
export async function addImageToJoin (img: string, id: number) {
	const rows = conn.execute(`
        INSERT INTO Product_Image (ProductId, ImageId) VALUES (?,?);`, [id, img])
	return rows
}

//SAVE FOR LATER
//gets a product with its images :)
export async function productandImage (img: string, id: number) {
	const rows = conn.execute(`
        SELECT Product.*, GROUP_CONCAT(Image.file SEPARATOR ',') AS images
        FROM Product
                 LEFT JOIN Product_Image ON Product.Id = Product_Image.ProductId
                 LEFT JOIN Image ON Product_Image.ImageId = Image.Id
        WHERE Product.Id = ?
        GROUP BY Product.Id`, [id])
	return rows
}
