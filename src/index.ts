import { AppDataSource } from "./data-source"
import app from './app'
import { RISE } from "./config/constants.config"

AppDataSource.initialize().then(async () => {
    app.listen(RISE.EXPRESS_PORT)
    console.log(`Express server has started on port ${RISE.EXPRESS_PORT}`)

}).catch(error => console.log(error))
