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
    
    @ManyToOne(() => User, (author) => author.posts, { onDelete: "SET NULL" })
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post, { onDelete: "SET NULL" })
    comments: Comment[]

    @CreateDateColumn()
    createdAt: Date;
    newPost: Record<string, any>
}