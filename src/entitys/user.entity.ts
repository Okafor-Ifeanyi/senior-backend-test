import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, OneToMany } from "typeorm"
import * as bcrypt from "bcrypt"
import { Post } from "./post.entity"
import { Comment } from "./comment.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    name: string

    @Column({nullable: true})
    age: number 
    
    @Column({ type: "varchar", length: 11, nullable: true})
    phoneNumber: string

    @Column()
    password: string; // Hashed password

    @CreateDateColumn()
    createdAt: Date;

    // @Column()
    // latestComment: Comment| null;;

    @OneToMany(() => Post, (post) => post.author, { onDelete: "SET NULL" })
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.author, { onDelete: "SET NULL" })
    comments: Comment[]

    // Hash the password before saving
    @BeforeInsert()
    async hashPassword() {
        const salt: string = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    // Validate password
    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}