import { Router } from "express"
import { PostController } from "../controller/post.controller"
import validate from "../middlewares/validate.middleware"
import { postSchema } from "../schemas/index.schema"
import { isAuth } from "../middlewares/authenticate.middleware"

const router = Router()
const post = new PostController()

// Posts
router.post("/create", validate(postSchema), post.save)
router.get("/", isAuth, post.all)
router.get("/:id", isAuth, post.one)
router.get("/mine", isAuth, post.fetchMyPosts)
router.delete("/:id", isAuth, post.remove)

export default router
