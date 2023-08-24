import { UserController } from "./controller/UserController"
import { UserController2 } from "./controller/user.controller"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController2,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]