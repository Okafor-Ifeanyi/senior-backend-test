import { Router } from "express"
import { UserController } from "../controller/user.controller"
import validate from "../middlewares/validate.middleware"
import { userSchema } from "../schemas/index.schema"
import { isAuth } from "../middlewares/authenticate.middleware"

const router = Router()
const user = new UserController()

// Performance Challenge
router.get("/perfomanceChallenge", isAuth, user.perfomance)

// Users
router.post("/login", validate(userSchema), user.login)
router.post("/register", validate(userSchema), user.save)
router.get("/", isAuth, user.all)
router.get("/:id", isAuth, user.one)
router.delete("/:id", isAuth, user.remove)


export default router
