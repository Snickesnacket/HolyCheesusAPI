import {conn} from "../db";

export async function startTransaction() {
	await conn.query('START TRANSACTION;');
}

export async function commitTransaction() {
	await conn.query('COMMIT;')
}

export async function rollbackTransaction() {
	await conn.query('ROLLBACK;')
}