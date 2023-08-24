import { NextFunction, Request, Response } from "express"
import { UserService } from "../services/user.service";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { config } from "dotenv";
import { constants } from "../config/constants.config";

export class UserController2 {
    private userService = new UserService()

    async all(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.userService.getAllUsers()
            return res.status(201).json({ success: true, data: data })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const info = req.body;

        try {
            const user = Object.assign(new User(), info)
     
            const data = await this.userService.createUser(user)

            return res.status(201).json({ success: true, data: data })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }    

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        try {
            const user = await this.userService.findOneUser(id)

            if (!user) {
                return response.status(401).json({ 
                    success: false, 
                    message: constants.MESSAGES.USER.INVALID_ID_ERROR
                })
            }
            return response.status(201).json({ 
                success: true, 
                message: constants.MESSAGES.USER.FETCHED
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const user = await this.userService.findOneUser(id)

        if (!user) {
            return response.status(401).json({ 
                success: false, 
                message: constants.MESSAGES.USER.INVALID_ID_ERROR
            })
        }

        await this.userService.removeUser(user)

    }

}