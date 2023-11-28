import { Router } from 'express';
import {
  editUser,
  getAllJobByUser,
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController';
import {
  validateCreateUserInput,
  validateCheckAdmin,
  validateUser,
  validateLogin,
} from '../middlewares/validationMiddleware';

import { getAllUser } from '../controllers/userController';
import { authorrizePermission } from '../middlewares/authMiddleware';
import upload from '../middlewares/multerMiddlewres';
const router = Router();

router
  .route('/')

  .get(validateCheckAdmin, getAllUser);

router.get('/current-user', getCurrentUser);
router.get(
  '/admin/app-stats',
  authorrizePermission('admin'),
  getApplicationStats
);

router.put('/update-user', upload.single('image'), updateUser);
export default router;
