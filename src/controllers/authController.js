import { createJWT } from '../utils/tokenUtils';
import db from '../models/index';
import { hashPassword, comparePassword } from '../utils/passwordUtils';
import { UnauthenticatedError } from '../utils/customErrors';
import { StatusCodes } from 'http-status-codes';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await db.User.findOne({
    where: { email: email.toLowerCase() },
    raw: false,
  });

  const validUser =
    userFound && (await comparePassword(password, userFound.password));

  if (!validUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    role: userFound.role,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({ msg: 'login successful', userFound });
};

export const logoutUser = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user log out' });
};

export const register = async (req, res) => {
  const { email, password, firstName, location, lastName } = req.body;

  const userFound = await db.User.findOne({
    where: { email: email },
    raw: false,
  });
  if (userFound) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: 'email already exits' });
  }

  const user = await db.User.create({
    email: email.toLowerCase(),
    password: await hashPassword(password),
    firstName,
    lastName,
    location,
  });
  res.status(StatusCodes.CREATED).json({ user });
};

export const editUser = async (req, res) => {
  const { id } = req.params;

  const user = await db.User.findOne({ where: { id: id }, raw: false });
  if (!user) throw new NotFoundErr(`no users found`);

  const { name, role } = req.body;
  user.set({
    name: name,
    role: role,
  });

  await user.save();

  await user.reload();

  res.status(200).json({ msg: 'user update successfull', user });
};
