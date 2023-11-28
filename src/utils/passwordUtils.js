import bcrypt, { genSalt } from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);

  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
