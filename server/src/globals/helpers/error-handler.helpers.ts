import { HTTP_STATUS } from '@constants/http-statuses.constants';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  isCustom: boolean;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
      isCustom: true,
    };
  }
}

export class NotAcceptableError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_NOT_ACCEPTABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class ConflictError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_CONFLICT;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class JoiRequestValidationError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_BAD_REQUEST;
  status = 'error';

  constructor(message: any) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_UNAUTHORIZED;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargetError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_REQUEST_ENTITY_TOO_LARGE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.HTTP_INTERNAL_SERVER_ERROR;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
