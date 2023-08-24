import { Router } from "express"
import { UserController } from "../controller/UserController"

const router = Router()
const user = new UserController()

console.log("USER INS:", user)


router.post("/users", user.save)
router.get("/users", user.all)
router.get("/users/:id", user.one)
router.delete("/users/:id", user.remove)

export default router;