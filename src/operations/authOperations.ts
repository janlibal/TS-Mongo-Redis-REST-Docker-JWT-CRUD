import { CookieOptions, NextFunction, Request, Response } from 'express';
import config from 'config';
import { findUserByEmail, createNewUser, findUser, signToken } from '../repositories/authRepository'
import AppError from '../utils/appError';


const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + config.get<number>('accessTokenExpiresIn') * 6000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 6000,
    httpOnly: true,
    sameSite: 'lax',
};



export const signUp = async (credentials: any, res: Response) => {
  // parses incoming data
  try{
      const user = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password
    }

   // checks if user exists
    await findUserByEmail(user.email)

    // create new user
    const newUser = await createNewUser(user)

    // return data
    return newUser
    
    } catch (err: any) {
      if (err.code === 11000) {
          return res.status(409).json({
            status: 'fail',
            message: 'Email already exists',
          });
        }
    }
}


export const signIn = async (credentials: any, res: Response, next: NextFunction) => {
  try{
    const login = {
      email: credentials.email,
      password: credentials.password
    }
  
  // checks if user exists
  const user = await findUser({email: login.email})
    
   // Check if user exist and password is correct
  if (!user || !(await user.comparePasswords(user.password, login.password))) {
    return (new AppError('Invalid email or password', 401));
  }

  // Create an Access Token
  const { access_token } = await signToken(user);

   // Send Access Token in Cookie
   res.cookie('access_token', access_token, accessTokenCookieOptions);
   res.cookie('logged_in', true, {
   ...accessTokenCookieOptions,
   httpOnly: false,
   });

  res.status(200).json({
    status: 'success',
    user: user.name,
    accessToken: access_token
  });
  
} catch (err: any) {
  next(err);
}
  
}


