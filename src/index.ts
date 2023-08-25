import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entitys/user.entity"
import { errorHandler } from "./middlewares/errorHandler.middleware"
import router from "./routes/index.route"
import { create } from "domain"

AppDataSource.initialize().then(async () => {
    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use("/", router)


    // register express routes from defined application routes
    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
    //         try {
    //             const result = await (new (route.controller as any))[route.action](req, res, next);
    //             return res.json(result);
    //         } catch(err) {
    //             next(err);
    //         }
    //     });
    // });
     
    app.use(errorHandler)
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
