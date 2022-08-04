import express from 'express';
import { createPostHandler, getAllPostsHandler, getMyPostsHandler, getPostByIdHandler, updatePostByIdHandler } from '../controllers/postController';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { postSchema } from '../schemas/postSchema';
import { validate } from '../middleware/validate';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/createNewPost', validate(postSchema), createPostHandler);
router.get('/getAllPosts', getAllPostsHandler);
router.get('/getMyPosts', getMyPostsHandler);
router.get('/:id', getPostByIdHandler);
router.post('/update/:id', validate(postSchema), updatePostByIdHandler);

export default router;

