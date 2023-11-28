import { StatusCodes } from 'http-status-codes';

export class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundErr';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthenticatedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
