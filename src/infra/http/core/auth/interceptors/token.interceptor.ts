import { Response } from 'express';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { UserEntity } from '@/src/app/entities/user.entity';

import { signToken } from '../../helpers/jwt';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<UserEntity>): Observable<UserEntity> {
    return next.handle().pipe(
      map(
        (user: UserEntity): UserEntity => {
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