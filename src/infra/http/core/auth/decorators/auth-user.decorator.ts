import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from '@/app/entities/user.entity';

export const AuthUser = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext): string | UserEntity | Date => {
    const user = ctx.switchToHttp().getRequest<Request>().user as UserEntity;

    return data ? user && user[data] : user;
  }
);