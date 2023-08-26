import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";
import { Post } from "../entitys/post.entity";
import { riseConsts } from "../config/constants.config";
import { IPost, IPostExisting } from "../interfaces/post.interface";

export class PostController {
    private postService = new PostService()

    all = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.postService.getAllPost()
            console.log(data[0].author)
            return res.status(201).json({ success: true, data: data })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    save = async (req: Request, res: Response, next: NextFunction) => {
        const info = req.body;
        try {
            const user: IPost = Object.assign(new Post(), {...info, author: req.user })

            const data = await this.postService.createPost(user)

            return res.status(201).json({ success: true, data: data })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    one = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const user = await this.postService.findOnePost(id)

            if (!user) {
                return response.status(401).json({ 
                    success: false, 
                    message: riseConsts.MESSAGES.USER.INVALID_ID_ERROR
                })
            }
            return response.status(201).json({ 
                success: true, 
                message: riseConsts.MESSAGES.USER.FETCHED,
                data: user
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    remove = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const user = await this.postService.findOnePost(id)

            if (!user) {
                return response.status(401).json({ 
                    success: false, 
                    message: riseConsts.MESSAGES.USER.INVALID_ID_ERROR
                })
            }

            await this.postService.removePost(user)
            return response.status(201).json({
                success: true,
                message: riseConsts.MESSAGES.USER.DELETED
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}