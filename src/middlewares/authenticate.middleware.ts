import { Request, Response, NextFunction } from 'express';
// import { HttpException } from '../exceptions/HttpException';
import { UserService } from '../services/user.service';
import { verifyToken } from '../utils/jwt.util';
import { RISE } from '../config/constants.config';

export const isAuth = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    // initialize the token from header
    const token = req.headers['authorization']
    ? req.headers['authorization'].split('Bearer ')[1]
    : null;

    // If token is missing throw error
    if (!token) {
      return res.status(401).json({
        success: false, message: RISE.MESSAGES.TOKEN.NOTFOUND})
    } else {
      // Verify the token found to determin token current value
      const { decoded, expired } = verifyToken(token);

      // If token is expired throw error
      if (expired) {
        return res.status(401).json({
          success: false, message: RISE.MESSAGES.TOKEN.EXPIRED
        })
      }

      // Call userService and check if user exists on db
      const userService = new UserService()
      const user = await userService.findOneUser(decoded?.id)

      // If user is not found throw error
      if(!user){
        return res.status(401).json({
          success: false, message: RISE.MESSAGES.USER.INVALID_ID_ERROR
        })
      }

      // instantiate req.user to user details, Pre defined under ../config/@types/express
      req.user = user;

      // If everything goes according to statement pass on
      next();
    }
  } catch (error) {
    next(error)
  }
};