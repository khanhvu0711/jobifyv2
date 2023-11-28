import { Router } from 'express';
import * as jobController from '../controllers/jobController.js';
import {
  validateJobInput,
  validateUser,
} from '../middlewares/validationMiddleware.js';

const router = Router();

router
  .route('/')
  //get all job
  .get(jobController.getAllJob)
  //create job
  .post(validateJobInput, jobController.createJob);

router.route('/stats').get(jobController.showStats);

router
  .route('/:id')

  //get single job
  .get(validateUser, jobController.getSingleJob)

  //update job
  .patch(validateUser, validateJobInput, jobController.updateJob)

  //delete job
  .delete(validateUser, jobController.deleteJob);

export default router;
