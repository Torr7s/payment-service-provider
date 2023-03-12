import { 
  createParamDecorator, 
  ExecutionContext 
} from '@nestjs/common';
import { Request } from 'express';

import { User } from '@/src/app/entities/user';
import { Payable } from '@/src/app/entities/payable';
import { Transaction } from '@/src/app/entities/transaction';

export const AuthUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext): string | User | Date | Transaction[] | Payable[] => {
    const user = ctx.switchToHttp().getRequest<Request>().user as User;

    return data ? user && user[data] : user;
  }
);