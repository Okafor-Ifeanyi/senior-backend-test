import { DeepPartial } from "typeorm";
import { riseConsts } from "../config/constants.config";
import { AppDataSource } from "../data-source";
import { Post } from "../entitys/post.entity";
import { IPost, IPostExisting } from "../interfaces/post.interface";


export class PostService {
    private userRepository = AppDataSource.getRepository(Post);

    getAllPost = async () => {
        return await this.userRepository.find();
    }


    createPost = async (input: IPost) => {
        return await this.userRepository.save(input)
    }

    async findOnePost(id: number) {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async removePost(data: any) {
        return await this.userRepository.remove(data);
    }
}
