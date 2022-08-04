import { NextFunction, Request, Response } from 'express';
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import postRoutes from './postRoutes'

export default function (app: any) {
    app.use('/auth', authRoutes)
    app.use('/users', userRoutes)
    app.use('/posts', postRoutes)

    app.get('/test', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
          status: 'success',
          message: '/test route appears to be working!',
        });
      });

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      const err = new Error(`Route ${req.originalUrl} not found!`) as any;
      err.statusCode = 404;
      next(err);
    });
}
