import { Router } from "express"
import userRouter from './user.route'

const router = new Router()

router.use("/users", userRouter)
