import { Router } from "express"
import { userRoutes } from './user.route'

const router = new Router()


export const routes = [
    { path: '/users', router: userRoutes },
    // { path: '/', router: docRouter },
    // { path: '/oauth', router: oauthRouter },
    // { path: '/transactions', router: transactionRouter }
];


