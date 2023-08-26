import { DeepPartial } from "typeorm";
import { Post } from "../entitys/post.entity";
import { User } from "../entitys/user.entity";


export interface IComment {
  message: string;
  author: DeepPartial<User>;
  post: DeepPartial<Post>
}

export interface ICommentExisting {
    id: number
    message: string;
    author: DeepPartial<User>;
    post: DeepPartial<Post>
    createdAt: DeepPartial<Date>
  }