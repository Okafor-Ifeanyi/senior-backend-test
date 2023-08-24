import { NextFunction, Request, Response } from "express"

export function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode  || 500).send(err.message);
}