import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { constants } from "./config/constants.config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: constants.DATABASE_NAME,
    password: constants.DATABASE_PASSWORD, 
    database: constants.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
