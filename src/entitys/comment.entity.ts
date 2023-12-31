import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"
import { Post } from "./post.entity"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    message: string
    
    @ManyToOne(() => User, (author) => author.comments, { onDelete: "SET NULL" })
    author: User;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: "SET NULL" })
    post: User;

    @CreateDateColumn()
    createdAt: Date;
    newPost: Record<string, any>
}