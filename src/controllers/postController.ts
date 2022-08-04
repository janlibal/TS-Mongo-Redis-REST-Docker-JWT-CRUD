import { CookieOptions, NextFunction, Request, Response } from 'express';
import { createPost, getAllPosts, getMyPosts, getPostById, updatePostById } from '../operations/postOperations';
import { PostInput } from '../schemas/postSchema';
import AppError from '../utils/appError';

export const createPostHandler = async (req: Request<{}, {}, PostInput>, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const postCandidate = {
      title: req.body.title,
      content: req.body.content,
      photo: req.body.photo,
      postedBy: user._id
    }

    const post = await createPost(postCandidate)

    res.status(201).json({
      status: 'success',
      data: {
          post 
      },
    })
    
  } catch (err: any) {
      next(err);
    }
};


export const getAllPostsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const posts = await getAllPosts();

      res.status(200).json({
        status: 'success',
        postsNo: posts.length,
        data: {
          posts,
        },
      });
    } catch (err: any) {
      next(err);
    }
};


export const getMyPostsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    const posts = await getMyPosts(user);

    res.status(200).json({
      status: 'success',
      postsNo: posts.length,
      user: user.email,
      data: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const getPostByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    return next(new AppError('Wrong post id entered', 401));
  }
};



export const updatePostByIdHandler = async (req: Request<{}, {}, PostInput>, res: Response, next: NextFunction) => {
  try {
    const id = req.params;
    
    const updateCandidate = {
      title: req.body.title,
      content: req.body.content,
      photo: req.body.photo,
    }

    const update = await updatePostById(updateCandidate, id)
     
    res.status(200).json({
      status: 'success.',
      data: {
        update
      },
    });
  } catch (err: any) {
    return next(new AppError('Wrong post id entered', 401));
  }
  
};






