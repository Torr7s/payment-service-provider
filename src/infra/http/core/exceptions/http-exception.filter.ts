import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { 
  ArgumentsHost, 
  BadRequestException, 
  Catch, 
  ExceptionFilter, 
  HttpException, 
  HttpExceptionOptions
} from '@nestjs/common';
import { Request, Response } from 'express';

import { BaseException } from '@/src/app/exceptions/base.exception';

type ResponseBody = {
  statusCode: number;
  message: string;
  timestamp: string;
  errors?: string[];
  endpoint: string;
  details?: HttpExceptionOptions;
}

type ExceptionResponse = {
  statusCode: number;
  message: string[];
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    const body = {
      statusCode: exception.getStatus(),
      message: exception.message,
      timestamp: new Date().toISOString(),
      endpoint: request.url
    } as ResponseBody;

    if (exception instanceof BaseException) {
      body.details = exception.exceptionOptions;
    } else if (exception instanceof BadRequestException) {
      const exc = exception.getResponse() as ExceptionResponse;

      body.message = exc.error; 
      body.errors = exc.message;
    }

    response.status(exception.getStatus()).json(body);
  }
}