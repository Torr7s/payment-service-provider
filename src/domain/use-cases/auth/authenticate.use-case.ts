import { User } from '@prisma/client';

import { JwtPayload } from '@/core/@types';
import { UserEntity } from '@/domain/entities/user.entity';

export interface IAuthUseCase {
  signToken: (user: UserEntity) => string;
  verifyPayload: (payload: JwtPayload) => Promise<UserEntity>;
}