import mysql, { ConnectionOptions } from 'mysql2/promise';

export let conn: mysql.Connection;

export async function dbConnect() {
	const access: ConnectionOptions = {
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
	};

	conn = await mysql.createConnection(access);
}
