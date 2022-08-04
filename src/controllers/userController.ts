import { NextFunction, Request, Response } from 'express';
import { getAllUsers, getUserById } from '../operations/userOperations'
import AppError from '../utils/appError';

export const getMeHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };
  
export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    return next(new AppError('Wrong user id entered', 401));
  }
};