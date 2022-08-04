import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schemas/userSchema';
import { signUp, signIn } from '../operations/authOperations'

// Cookie options -- might move to another file
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 6000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 6000,
  httpOnly: true,
  sameSite: 'lax',
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;


export const signUpHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  try {

    const credentials = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    }

    const user = await signUp(credentials, res)
   
      res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
  if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};

export const signInHandler = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
  
    const credentials = {
        email: req.body.email,
        password: req.body.password
     }
     const result = await signIn(credentials, res, next)
    res.send(result)
 
}


 