import { AppDataSource } from "../data-source";
import { Post } from "../entitys/post.entity";
import { IPost, IPostExisting } from "../interfaces/post.interface";


export class PostService {
    private userRepository = AppDataSource.getRepository(Post);

    getAllPost = async (relations?: string[]) => {
        return await this.userRepository.find(
            {relations: relations}, 
        );
    }


    createPost = async (input: IPost) => {
        return await this.userRepository.save(input)
    }

    async findOnePost(id: number, relations?: string[]) {
        const post = await this.userRepository.createQueryBuilder('post')
        .where('post.id = :id', { id });
        
        if (relations) {
            post.leftJoinAndSelect('post.author', 'author');
        }
        return post.getOne();
    }

    async removePost(data: any) {
        return await this.userRepository.remove(data);
    }
}
