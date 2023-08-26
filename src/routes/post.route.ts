import { Router } from "express"
import { PostController } from "../controller/post.controller"
import validate from "../middlewares/validate.middleware"
import { postSchema } from "../schemas/index.schema"
import { isAuth } from "../middlewares/authenticate.middleware"

const router = Router()
const post = new PostController()

// Posts
router.post("/create", validate(postSchema), post.save)
router.get("/", post.all)
router.get("/mine", post.fetchMyPosts)
router.get("/:id", post.one)
router.delete("/:id", post.remove)

export default router
