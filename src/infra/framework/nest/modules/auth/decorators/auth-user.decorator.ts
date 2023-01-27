import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const AuthUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext): string | User | Date => {
    const user = ctx.switchToHttp().getRequest<Request>().user as User;

    return data ? user && user[data] : user;
  }
);