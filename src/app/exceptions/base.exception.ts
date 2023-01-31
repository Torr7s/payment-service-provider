import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  private _exceptionOptions?: HttpExceptionOptions;

  constructor(message: string, status: HttpStatus, exceptionOptions?: HttpExceptionOptions) {
    super(
      message, 
      status, 
      exceptionOptions
    );

    this._exceptionOptions = exceptionOptions;

    HttpException.captureStackTrace(this, this.constructor);
  }

  get exceptionOptions(): HttpExceptionOptions {
    return this._exceptionOptions;
  }
}