import { Router } from "express"
import { UserController } from "../controller/user.controller"
import validate from "../middlewares/validate.middleware"
import { indexSchema } from "../schemas/user.schema"

const router = new Router()

const user = new UserController()

// router.post("/users", async (req: Request, res: Response, next: NextFunction) => {
//     const result = await user.save(req, res, next)
//     res.send(result)
// })

router.post("/users/login", validate(indexSchema), user.login)
router.post("/users/register", validate(indexSchema), user.save)
router.get("/users", user.all)
router.get("/users/:id", user.one)
router.delete("/users/:id", user.remove)

export default router;