import type { Request, Response, NextFunction } from 'express';
 
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // JWT authentication logic here
  next();
}; 