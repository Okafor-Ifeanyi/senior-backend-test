import { Request, Response, NextFunction } from "express"
import { UserController } from "../controller/UserController"

export const controllerWrapper = (
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => async (req: Request, res: Response, next: NextFunction) => {
    const result = await func(req, res, next)
    res.send(result)
}