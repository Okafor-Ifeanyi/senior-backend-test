import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";
import { Post } from "../entitys/post.entity";
import { RISE } from "../config/constants.config";
import { IPost, IPostExisting } from "../interfaces/post.interface";
import { UserService } from "../services/user.service";

export class PostController {
    private postService = new PostService()

    all = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.postService.getAllPost(["author"])
            return res.status(201).json({ success: true, message: RISE.MESSAGES.POST.FETCHEDALL, data: data })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    fetchMyPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.postService.getAllPost(["author"])
            const mine: object[] = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].author.id = req.user?.id){
                    mine.push(data[i])
                }
            }

            return res.status(201).json({ 
                success: true, message: RISE.MESSAGES.POST.FETCHEDALL, data: mine })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    save = async (req: Request, res: Response, next: NextFunction) => {
        const info = req.body;
        const userService = new UserService()
        const author = await userService.findOneUser(req.user?.id)
       
        try {
            // const newPost = new Post();
            // newPost.title = info.title;
            // newPost.content = info.content;
            // newPost.author = author
            // if (req.body.description){
            //     newPost.description = info.description
            // }
            
            const user: IPost = Object.assign(new Post(), {...info, author: author })

            const data = await this.postService.createPost(user)

            return res.status(201).json({ success: true, message: RISE.MESSAGES.POST.CREATED, data: data })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    one = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const user = await this.postService.findOnePost(id, ['author'])
                // console.log(user.author)
            if (!user) {
                return response.status(401).json({ 
                    success: false, 
                    message: RISE.MESSAGES.USER.INVALID_ID_ERROR
                })
            }
            return response.status(201).json({ 
                success: true,
                message: RISE.MESSAGES.POST.FETCHED,
                data: user
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }


    remove = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const post = await this.postService.findOnePost(id)

            if (!post) {
                return response.status(401).json({ 
                    success: false, 
                    message: RISE.MESSAGES.POST.INVALID_POST_ERROR
                })
            }

            await this.postService.removePost(post)
            return response.status(201).json({
                success: true,
                message: RISE.MESSAGES.POST.DELETED
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}