import { Response } from 'express';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { User } from '@/src/app/entities/user';

import { signToken } from '../../helpers/jwt';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<User>): Observable<User> {
    return next.handle().pipe(
      map(
        (user: User): User => {
          const response: Response = context.switchToHttp().getResponse<Response>();
          const token: string = signToken(user);

          response.setHeader('Authorization', `Bearer ${token}`);
          response.cookie('token', token, {
            httpOnly: true,
            signed: true,
            sameSite: 'strict',
            secure: process.env.STAGE === 'production'
          });

          return user;
        }
      )
    );
  }
}