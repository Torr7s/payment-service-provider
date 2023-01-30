import { JwtPayload } from '@/@types';

import { UserEntity } from '@/domain/entities/user.entity';

export interface IAuthUseCase {
  signToken: (user: UserEntity) => string;
  verifyPayload: (payload: JwtPayload) => Promise<UserEntity>;
}