import { Router } from "express"
import { CommentController } from "../controller/comment.controller"
import validate from "../middlewares/validate.middleware"
import { commentSchema } from "../schemas/index.schema"
import { isAuth } from "../middlewares/authenticate.middleware"

const router = Router()
const comment = new CommentController()

// Posts
router.post("/create", validate(commentSchema), comment.save)
router.get("/", isAuth, comment.all)
router.get("/:id", isAuth, comment.one)
router.delete("/:id", isAuth, comment.remove)

export default router
