import { Request, Response } from 'express'

export const store = async (req: Request, res: Response) => {

	try {
		res.send({
			status: "success",
			data: req.body,
		})

	} catch (err) {
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}
