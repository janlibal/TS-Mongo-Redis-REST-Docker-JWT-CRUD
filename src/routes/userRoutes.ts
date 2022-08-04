import express from 'express';
import { getMeHandler, getAllUsersHandler, getUserByIdHandler } from '../controllers/userController';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);


router.get('/', restrictTo('admin'), getAllUsersHandler);
router.get('/me', getMeHandler);
router.get('/:id', getUserByIdHandler);



export default router;

