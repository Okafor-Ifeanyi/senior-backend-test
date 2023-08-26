import { AppDataSource } from "../data-source";
import { Comment } from "../entitys/comment.entity";
import { IComment, ICommentExisting } from "../interfaces/comment.interface";


export class CommentService {
    private userRepository = AppDataSource.getRepository(Comment);

    getAllComments = async (relations?: string[]) => {
        return await this.userRepository.find(
            {relations: relations}
        );
    }


    createComment = async (input: any) => {
        return await this.userRepository.save(input)
    }

    async findOneComment(id: number, relations?: string[]) {
        const comment = await this.userRepository.createQueryBuilder('Comment')
        .where('comment.id = :id', { id });
        
        if (relations) {
            comment.leftJoinAndSelect('comment.author', 'author');
            comment.leftJoinAndSelect('comment.Comment', 'Comment');
        }
        return comment.getOne();
    }

    async removeComment(data: any) {
        return await this.userRepository.remove(data);
    }
}
