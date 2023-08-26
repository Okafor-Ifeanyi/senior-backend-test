import * as express from "express"
import * as bodyParser from "body-parser"
import { errorHandler } from "./middlewares/errorHandler.middleware"
import router from "./routes/index.route"

// create express app
const app = express()

app.use(bodyParser.json())

// Handles my routing
app.use("/", router)

// Error handler
app.use(errorHandler)

export default app;