import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JWTUser {
  userId: number;
  username?: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
     return
  }
};
