import db from '../models/index';
import { StatusCodes } from 'http-status-codes';
const fs = require('fs');
import { Buffer } from 'buffer';
import { NotFoundErr, UnauthenticatedError } from '../utils/customErrors';

//let jobs = [];

//get all user

// create user

// edit job

export const getAllJobByUser = async (req, res) => {
  const { id } = req.user;

  const jobs = await db.Job.findAll({
    include: db.User,
    where: { createdBy: id },
    raw: true,
  });
  if (!jobs) throw new NotFoundErr(`you don't have any jobs`);
  res.status(StatusCodes.OK).json({ msg: 'job find success', jobs });
};

export const getAllUser = async (req, res) => {
  const users = await db.User.findAll();
  if (users && users.length >= 0) {
    return res.status(StatusCodes.OK).json({ users });
  } else {
    return res.status(StatusCodes.OK).json({ msg: 'no users found' });
  }
};

export const getCurrentUser = async (req, res) => {
  const userFound = await db.User.findOne({
    where: { id: req.user.id },
    raw: true,
    attributes: { exclude: ['password'] },
  });

  if (!userFound) throw new NotFoundErr('user not found');

  res.status(StatusCodes.OK).json({ msg: 'get user', user: userFound });
};

export const getApplicationStats = async (req, res) => {
  const users = await db.User.count();
  const jobs = await db.Job.count();

  res
    .status(StatusCodes.OK)
    .json({ msg: 'get start application user', jobs, users });
};

export const updateUser = async (req, res) => {
  const userFound = await db.User.findOne({
    where: { id: req.user.id },
    raw: false,
  });

  if (!userFound) throw new NotFoundErr('user not Found');
  const obj = { ...req.body };

  await userFound.update({
    firstName: obj.firstName,
    lastName: obj.lastName,
    location: obj.location,
    gender: obj.gender,
  });

  //console.log('req file path', req.file.path);
  if (req.file) {
    const image = req.file.buffer.toString('base64');

    await userFound.update({ image: image });
  }

  await userFound.save();
  await userFound.reload();

  res.status(StatusCodes.OK).json({ msg: 'User updated', user: userFound });
};

export const getUser = async (id) => {
  const user = await db.User.findOne({ where: { id: id }, raw: true });
  if (!user) return '';

  // user.image = `data:image/png;base64,${imageAvatar}`;
  return user.image;
};
