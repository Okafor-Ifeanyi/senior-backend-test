import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
// import { UserService } from "../services/user.service";
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    // private userService = new UserService()

    // async all(request: Request, response: Response, next: NextFunction) {
    //     try {
    //         const users = await this.userService.getAllUsers();
    //         return response.json(users);
    //     } catch (error) {
    //         return response.status(500).json({ error: error.message });
    //     }
    // }
    async all(request: Request, response: Response, next: NextFunction) {
        // const data = await this.userRepository.find()
        // response.send(data)
        const fetchAll = async (req: Request, res: Response, next: NextFunction) => {
            const result = await this.userRepository.find()
            return result
        }
        const data = await fetchAll(request, response, next)
        response.send(data) 
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        console.log("ID:", id)
        console.log("USER:", user)

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;
        console.log(lastName)

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })
     
        const data = await this.userRepository.save(user)
        
        response.send(data)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}