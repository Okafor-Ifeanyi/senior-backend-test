import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { Comment } from "../entitys/comment.entity";
import { RISE } from "../config/constants.config";
import { IComment, ICommentExisting } from "../interfaces/comment.interface";
import { UserService } from "../services/user.service";
import { PostService } from "../services/post.service";

export class CommentController {
    private commentService = new CommentService()

    all = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.commentService.getAllComments(["author", "post"])
            // console.log(data[0].author)
            return res.status(201).json({ success: true, message: RISE.MESSAGES.COMMENT.FETCHEDALL, data: data })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    save = async (req: Request, res: Response, next: NextFunction) => {
        const info: IComment = req.body;
        try {
            const userService = new UserService()
            const author = await userService.findOneUser(req.user?.id)
            const postService = new PostService()
            const post = await postService.findOnePost(parseInt(req.params.postId))
        
            const user: IComment = Object.assign(new Comment(), {...info, author: author, post: post })

            const data = await this.commentService.createComment(user)

            return res.status(201).json({ success: true, message: RISE.MESSAGES.COMMENT.CREATED, data: data })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    one = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const comment = await this.commentService.findOneComment(id, ['author', 'post'])
                // console.log(user.author)
            if (!comment) {
                return response.status(401).json({ 
                    success: false, 
                    message: RISE.MESSAGES.COMMENT.INVALID_POST_ERROR
                })
            }
            return response.status(201).json({ 
                success: true,
                message: RISE.MESSAGES.COMMENT.FETCHED,
                data: comment
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    remove = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id)
        try {
            const user = await this.commentService.findOneComment(id)

            if (!user) {
                return response.status(401).json({ 
                    success: false, 
                    message: RISE.MESSAGES.COMMENT.INVALID_POST_ERROR
                })
            }

            await this.commentService.removeComment(user)
            return response.status(201).json({
                success: true,
                message: RISE.MESSAGES.COMMENT.DELETED
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}