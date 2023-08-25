import { Request, Response, NextFunction } from 'express';
// import { HttpException } from '../exceptions/HttpException';
import { UserService } from '../services/user.service';
import { verifyToken } from '../utils/jwt.util';
import { riseConsts } from '../config/constants.config';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']
    ? req.headers['authorization'].split('Bearer ')[1]
    : null;

  if (!token) {
    next(new Error(riseConsts.MESSAGES.TOKEN.NOTFOUND));
  } else {
    const { decoded, expired } = verifyToken(token);

    if (expired) {
      next(new Error(riseConsts.MESSAGES.TOKEN.UNAUTHORIZED));
    }
    
    const user = await User.find(decoded?._id);

    if (!user) {
      next(new Error(riseConsts.MESSAGES.TOKEN.NOTFOUND));
    }
    req.user = { id : user?.id};
    req.name = {name: user?.name}
    next();
  }
};