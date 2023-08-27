import { Router } from "express"
import { isAuth } from "../middlewares/authenticate.middleware"
import userRouter from "./user.route"
import postRouter from "./post.route"
import commentRouter from "./comment.route"

const router = Router()

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server ok' });
});

router.use("/users", userRouter) // find performance chllenge here
router.use("/users/:userId/posts", isAuth, postRouter)
router.use("", isAuth, commentRouter)



export default router;