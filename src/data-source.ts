import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { config } from "./config/constants.config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: config.DATABASE_NAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
