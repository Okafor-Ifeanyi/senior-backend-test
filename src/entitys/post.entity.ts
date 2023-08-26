import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

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

    @CreateDateColumn()
    createdAt: Date;
}