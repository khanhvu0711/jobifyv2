import { body, validationResult, param, cookie } from 'express-validator';
import {
  BadRequestError,
  NotFoundErr,
  UnauthenticatedError,
  Unauthorized,
} from '../utils/customErrors';
import { JOB_STATUS, JOB_TYPE, USER_ROLE } from '../utils/constant';
import db from '../models/index';
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundErr('no job find');
        }
        if (errorMessages[0].startsWith('no authorize')) {
          throw new Unauthorized('no authorize this route');
        }
        console.log(errorMessages);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('positiom is required'),
  body('jobLocation').notEmpty().withMessage('location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid status value'),
]);

export const validateCreateUserInput = withValidationErrors([
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('email').toLowerCase().notEmpty().withMessage('email is required'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password require atleast 6 character'),
]);

export const validateUser = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const job = await db.Job.findOne({ where: { id: value } });
    if (!job) throw new NotFoundErr('no job find');
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.id === job.createdBy;
    if (!isAdmin && !isOwner) throw new Unauthorized('no authorize this route');
  }),
]);

export const validateCheckAdmin = withValidationErrors([
  cookie('token').custom(async (value, { req }) => {
    if (!value)
      throw new UnauthenticatedError(
        'no authenticated valid, please login again'
      );
    const isAdmin = req.user.role === 'admin';
    if (!isAdmin) throw new Unauthorized('you are not authorized');
  }),
]);
