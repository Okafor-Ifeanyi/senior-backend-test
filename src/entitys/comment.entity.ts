import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"
import { Post } from "./post.entity"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    message: string
    
    @ManyToOne(() => User, (author) => author.posts)
    author: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post: User;

    @CreateDateColumn()
    createdAt: Date;
    newPost: Record<string, any>
}