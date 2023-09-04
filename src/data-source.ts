import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entitys/user.entity"
import { RISE } from "./config/constants.config"
import { Post } from "./entitys/post.entity"
import { Comment } from "./entitys/comment.entity"

const tlsOptions = RISE.SSL as unknown as boolean;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: RISE.HOST,
    port: parseInt(RISE.PORT),
    username: RISE.DATABASE_NAME,
    password: RISE.DATABASE_PASSWORD,
    database: RISE.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Post, Comment],
    migrations: [],
    subscribers: [],
    ssl: tlsOptions, // Add this line to enable SSL/TLS
})
