import {
  HttpExceptionOptions,
  HttpStatus
} from '@nestjs/common';

import { BaseException } from './base.exception';

export class AuthException extends BaseException {
  constructor(message: string, status: HttpStatus, exceptionOptions?: HttpExceptionOptions) {
    super(
      message,
      status,
      exceptionOptions
    );
  }
}