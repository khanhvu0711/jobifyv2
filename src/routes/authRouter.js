import { Router } from 'express';

import {
  validateCreateUserInput,
  validateUser,
} from '../middlewares/validationMiddleware';

import {
  loginUser,
  logoutUser,
  register,
  getAllUser,
  editUser,
} from '../controllers/authController';
import { getCurrentUser } from '../controllers/userController';

const router = Router();

router.route('/register').post(validateCreateUserInput, register);
router.get('/current-user', getCurrentUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/:id', validateUser).put(editUser);

export default router;
