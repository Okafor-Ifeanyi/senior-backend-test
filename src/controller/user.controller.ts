import { NextFunction, Request, Response } from "express"
import { UserService } from "../services/user.service";
import { User } from "../entitys/user.entity";
import { RISE } from "../config/constants.config";
import { generateToken } from "../utils/jwt.util";
import { IUser, IUserExisting } from "../interfaces/user.interface";

export class UserController {
    private userService: UserService

    constructor () {
        this.userService = new UserService()
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        // private userService = new UserService()
    
        try {
            const data = await this.userService.getAllUsers()
            return res.status(201).json({ success: true, data: data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    }

    save = async (req: Request, res: Response, next: NextFunction) => {
        const info = req.body;

        try {
            const user: IUser = Object.assign(new User(), info)

            const data: IUserExisting = await this.userService.createUser(user)

            return res.status(201).json({ success: true, data: data })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try{
            // Check if this user exists
            const { id, name} = await this.userService.login(req.body)
            // Check if the password matched

            const token = generateToken({ id, name }, { expiresIn: RISE.MAXAGE });

            return res.json({ success: true, Token_Type: "Bearer", token: token, userID: id });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    one = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const user : IUserExisting = await this.userService.findOneUser(id)

            if (!user) {
                return response.status(401).json({ 
                    success: false, 
                    message: RISE.MESSAGES.USER.INVALID_ID_ERROR
                })
            }
            return response.status(201).json({ 
                success: true, 
                message: RISE.MESSAGES.USER.FETCHED,
                data: user
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    remove = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const user : IUserExisting = await this.userService.findOneUser(id)

            if (!user) {
                return response.status(401).json({ 
                    success: false, 
                    message: RISE.MESSAGES.USER.INVALID_ID_ERROR
                })
            }

            await this.userService.removeUser(user)
            return response.status(201).json({
                success: true,
                message: RISE.MESSAGES.USER.DELETED
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
    perfomance = async (request: Request, response: Response, next: NextFunction) => {
        try {
            console.log("1. I'm Here")
            const winner: any = await this.userService.perfomance()

            if (!winner) {
                return response.status(401).json({ 
                    success: false, 
                    message: RISE.MESSAGES.USER.INVALID_ID_ERROR
                })
            }

            return response.status(201).json({
                success: true,
                message: RISE.MESSAGES.USER.FETCHEDALL,
                "Top Users": winner
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}