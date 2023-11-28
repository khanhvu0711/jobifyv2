import { StatusCodes } from 'http-status-codes';

const errorHandle = (err, req, res, next) => {
  const statusCodes = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'something went wrongs, please try later';
  res.status(statusCodes).json({ msg });
};

export default errorHandle;
