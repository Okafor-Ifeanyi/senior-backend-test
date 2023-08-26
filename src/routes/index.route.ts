import { Router } from "express"
import { isAuth } from "../middlewares/authenticate.middleware"
import userRouter from "./user.route"
import postRouter from "./post.route"

const router = Router()

router.use("/users", userRouter)
router.use("/users/:id/posts", isAuth, postRouter)

export default router;