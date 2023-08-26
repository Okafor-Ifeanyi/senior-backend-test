import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entitys/user.entity"
import { riseConsts } from "./config/constants.config"
import { Post } from "./entitys/post.entity"
import { Comment } from "./entitys/comment.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: riseConsts.DATABASE_NAME,
    password: riseConsts.DATABASE_PASSWORD, 
    database: riseConsts.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Post, Comment],
    migrations: [],
    subscribers: [],
})
