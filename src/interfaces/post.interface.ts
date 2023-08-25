import { DeepPartial } from "typeorm";
import { User } from "../entitys/user.entity";


export interface IPost {
  title: string;
  body: string;
  content: string;
  author: DeepPartial<User>;
}

export interface IPostExisting {
    id: number
    title: string;
    body: string;
    content: string;
    author: DeepPartial<User>;
    createdAt: DeepPartial<Date>
  }