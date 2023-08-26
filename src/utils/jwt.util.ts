import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { riseConsts } from '../config/constants.config';

interface IPayload {
  id: number;
  name: string;
}
interface IDecoded {
  decoded: { id: number; name:string; exp: number; iat: number } | null;
  expired: boolean;
}

const JWT_SECRET = riseConsts.JWT_SECRET;

export const generateToken = (payload: IPayload, options: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { ...options });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IDecoded['decoded'];
    return {
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};