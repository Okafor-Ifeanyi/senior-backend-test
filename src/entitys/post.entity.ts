import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./user.entity"
import { Comment } from "./comment.entity"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    title: string

    @Column({nullable: true})
    description: string 

    @Column()
    content: string 
    
    @ManyToOne(() => User, (author) => author.posts)
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @CreateDateColumn()
    createdAt: Date;
    newPost: Record<string, any>
}