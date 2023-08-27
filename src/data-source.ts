import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entitys/user.entity"
import { RISE } from "./config/constants.config"
import { Post } from "./entitys/post.entity"
import { Comment } from "./entitys/comment.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host:  "localhost",// RISE.HOST,
    port: 5432,
    username: "postgres",
    password: "risevest", 
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Post, Comment],
    migrations: [],
    subscribers: [],
})
