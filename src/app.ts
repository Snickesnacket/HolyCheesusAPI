import express from 'express';
const morgan = require('morgan');
import routes from './routes';
const cors = require('cors-express');
import * as dotenv from "dotenv";
const PORT = 3000;
dotenv.config();
import {dbConnect} from "./db";
import {validationErrorHandler} from "./middleware/json-validator";
import path from "path";

const app = express();
app.use( morgan('dev') )
app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/img', express.static(path.join(__dirname, '../uploads')));
app.use(validationErrorHandler);
dbConnect().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);

	});
});
