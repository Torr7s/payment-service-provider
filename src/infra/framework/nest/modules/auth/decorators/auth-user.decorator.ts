import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from '@/domain/entities/user.entity';
import { ConsumerEntity } from '@/domain/entities/consumer.entity';

export const AuthUser = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext): string | UserEntity | Date | ConsumerEntity => {
    const user = ctx.switchToHttp().getRequest<Request>().user as UserEntity;

    return data ? user && user[data] : user;
  }
);