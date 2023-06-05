import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '@constants/http-statuses.constants';
import { config } from '@root/config';

export const isTokenValid = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = (req.headers.authorization || req.headers.Authorization) as string;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(HTTP_STATUS.HTTP_UNAUTHORIZED).json({ error: true, msg: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.ACCESS_TOKEN_SECRET as string, (err) => {
    if (err) return res.status(HTTP_STATUS.HTTP_FORBIDDEN).json({ msg: 'Forbidden' });
    next();
  });
};
