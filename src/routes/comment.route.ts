import { Router } from "express"
import { CommentController } from "../controller/comment.controller"
import validate from "../middlewares/validate.middleware"
import { commentSchema } from "../schemas/index.schema"
import { isAuth } from "../middlewares/authenticate.middleware"

const router = Router()
const comment = new CommentController()

// Posts
router.post("/users/:userId/posts/:postId/comments/create", validate(commentSchema), comment.save)
router.get("/users/:userId/posts/:postId/comments/", isAuth, comment.all)
router.get("/users/:userId/posts/:postId/comments/:id", isAuth, comment.one)
router.delete("/users/:userId/posts/:postId/comments/:id", isAuth, comment.remove)

export default router
