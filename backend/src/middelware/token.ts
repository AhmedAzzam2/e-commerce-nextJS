import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretT = process.env.TOKEN_SECRET as unknown as string;
export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretT);
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};
