import * as Express from 'express';
interface userType {
  id: number;
  name: string;
  age: number;
  password: string;
  createdAt: Date;
  posts?: {};
  comments?: {};
}
declare global {
  namespace Express {
    interface Request {
      user?: userType;
    }
  }
}