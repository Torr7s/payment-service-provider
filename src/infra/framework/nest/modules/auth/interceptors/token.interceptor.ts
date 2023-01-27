import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { AuthUseCase } from '@/app/use-cases/auth/auth';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authUseCase: AuthUseCase) {}

  public intercept(context: ExecutionContext, next: CallHandler<User>): Observable<User> {
    return next.handle().pipe(
      map(user => {
        const response: Response = context.switchToHttp().getResponse<Response>();
        const token: string = this.authUseCase.signToken(user);

        response.setHeader('Authorization', `Bearer ${token}`);
        response.cookie('token', token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.STAGE === 'production'
        });

        return user;
      })
    );
  }
}