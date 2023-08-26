import { RISE } from "../config/constants.config";
import { AppDataSource } from "../data-source";
import { User } from "../entitys/user.entity";
import { Post } from "../entitys/post.entity";
import { Comment } from "../entitys/comment.entity";
import { IUser, IUserExisting } from "../interfaces/user.interface"
import { object } from "joi";

interface ExtendedUser {
    id: number;
    name: string;
    age: number;
    phoneNumber: string;
    password: string;
    createdAt: Date;
    posts: Post[];
    comments: Comment[];
    latestComment: Comment | null; // Change the type if necessary
}

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    getAllUsers = async () => {
        return await this.userRepository.find();
    }

    async createUser(data: Partial<IUser>) {
        return await this.userRepository.save(data);
    }

    async findOneUser(id: number) {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async perfomance() {
        const winners = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.posts', 'post')
            .leftJoinAndMapOne(
                'post.latestComment',
                'comment', // Use the Comment entity
                'comment', // Alias for the subquery
                'comment.postId = post.id', // Join condition
                qb => qb
                    .select('MAX(comment.createdAt)', 'latestCommentDate')
                    .addSelect('comment.postId', 'postId')
                    .groupBy('comment.postId')
            )
            .groupBy('user.id, post.id, comment.id')
            .orderBy('COUNT(post)', 'DESC')
            .limit(3)
            .getMany();

        return winners
    }

    login = async (input: Pick<IUser, 'name' | 'password'>) => {
        const { name, password } = input;
        
        const user = await this.userRepository.findOne({where: { name }});
        if (!user) throw new Error(RISE.MESSAGES.USER.INVALID_ID_ERROR);
      
        const check = await user.validatePassword(password)
        if (!check) {
          throw new Error(RISE.MESSAGES.USER.INVALID_PASSWORD_ERROR);
        }
        return user;
      };

    async findByName(name: string) {
        return await this.userRepository.findOne({
            where: { name }
        });
    }

    async removeUser(data: any) {
        return await this.userRepository.remove(data);
    }    
}
