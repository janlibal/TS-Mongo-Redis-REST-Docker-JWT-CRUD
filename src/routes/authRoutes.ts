import express from 'express';
import { signUpHandler, signInHandler } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/userSchema';


const router = express.Router();


router.post('/signup', validate(createUserSchema), signUpHandler);
router.post('/signin', validate(loginUserSchema), signInHandler);

export default router;
