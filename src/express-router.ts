import { Router } from "express"
import { UserController } from "./controller/UserController"
import { UserController2 } from "./controller/user.controller"
import {Request, Response, NextFunction} from "express"
import { UserService } from "./services/user.service"; // Import the UserService

// const user = new UserController()
const router = new Router()

// console.log("USER INSTANCE:", user)
const userService = new UserService(); // Instantiate the UserService

const user2 = new UserController2()
const user = new UserController()

router.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const result = await user.save(req, res, next)
    res.send(result)
})

router.get("/users", user.all)
router.get("/users/:id", user.one)
router.delete("/users/:id", user.remove)

export default router;