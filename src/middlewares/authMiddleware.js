import { UnauthenticatedError, Unauthorized } from '../utils/customErrors';
import { verifyJWT } from '../utils/tokenUtils';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    throw new UnauthenticatedError(
      'authentication invalid, please login again'
    );
  try {
    const data = verifyJWT(token);
    req.user = data;

    next();
  } catch (error) {
    throw new UnauthenticatedError(
      'authentication invalid, please login again'
    );
  }
};

export const authorrizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized('Unauthorized to access this route');
    }
    next();
  };
};
